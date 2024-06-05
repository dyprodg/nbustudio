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
    return {
        statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
