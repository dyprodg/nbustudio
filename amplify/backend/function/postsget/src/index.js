const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
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

  const params = {
    TableName: process.env.TABLENAME,
  };

  try {
    const data = await client.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Failed to fetch data",
        error: error.message,
      }),
    };
  }
};
