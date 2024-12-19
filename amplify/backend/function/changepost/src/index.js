const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // Parse request body
    const { postId, direction } = JSON.parse(event.body);
    const tableName = "projects-dev";

    if (!postId || !["up", "down"].includes(direction)) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ message: "Invalid request parameters" }),
        };
    }

    try {
        // Get the current post
        const currentPostResult = await dynamoDb
            .get({
                TableName: tableName,
                Key: { postId },
            })
            .promise();

        const currentPost = currentPostResult.Item;

        if (!currentPost) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify({ message: "Post not found" }),
            };
        }

        const currentPosition = currentPost.itemPosition; // Geändertes Attribut
        const targetPosition = direction === "up" ? currentPosition + 1 : currentPosition - 1;

        // Query the post at the target position
        const targetPostResult = await dynamoDb
            .scan({
                TableName: tableName,
                FilterExpression: "#itemPosition = :position", // Geändertes Attribut
                ExpressionAttributeNames: {
                    "#itemPosition": "itemPosition", // Geändertes Attribut
                },
                ExpressionAttributeValues: { ":position": targetPosition },
            })
            .promise();

        const targetPost = targetPostResult.Items[0];

        // Update the position of the current post
        await dynamoDb
            .update({
                TableName: tableName,
                Key: { postId },
                UpdateExpression: "set #itemPosition = :newPosition", // Geändertes Attribut
                ExpressionAttributeNames: {
                    "#itemPosition": "itemPosition", // Geändertes Attribut
                },
                ExpressionAttributeValues: {
                    ":newPosition": targetPosition,
                },
            })
            .promise();

        // If a post exists at the target position, swap positions
        if (targetPost) {
            await dynamoDb
                .update({
                    TableName: tableName,
                    Key: { postId: targetPost.postId },
                    UpdateExpression: "set #itemPosition = :newPosition", // Geändertes Attribut
                    ExpressionAttributeNames: {
                        "#itemPosition": "itemPosition", // Geändertes Attribut
                    },
                    ExpressionAttributeValues: {
                        ":newPosition": currentPosition,
                    },
                })
                .promise();
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ message: "Position updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating position: ", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ message: "Internal server error", error: error.message }),
        };
    }
};
