const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: process.env.REGION });

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_PROJECTS_ARN
	STORAGE_PROJECTS_NAME
	STORAGE_PROJECTS_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { postId } = JSON.parse(event.body);

    const command = new DeleteItemCommand({
        TableName: process.env.TABLENAME,
        Key: {
            "postId": {
                "S": postId
            }
        }
    });

    try {
        const response = await client.send(command);
        console.log(response);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ message: 'Post deleted successfully', response }),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ message: 'Failed to delete post', error }),
        };
    }
};
