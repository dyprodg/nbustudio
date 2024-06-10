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
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const tableName = 'projects-dev';
    const body = JSON.parse(event.body);

    // Notwendige Felder überprüfen
    const requiredFields = ['type', 'title', 'description', 'url'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify(`Missing required field: ${field}`),
            };
        }
    }

    const postId = uuidv4();

    const params = {
        TableName: tableName,
        Item: {
            postId: postId,
            ...body
        }
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify('Item successfully inserted'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify('Could not insert item'),
        };
    }
};
