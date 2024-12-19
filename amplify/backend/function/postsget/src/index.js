const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: process.env.REGION });

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const params = {
    TableName: process.env.TABLENAME,
  };

  try {
    const data = await client.send(new ScanCommand(params));
    // Sortieren nach 'position' (numerisch absteigend)
    const sortedItems = data.Items.sort(
      (a, b) => parseInt(b.itemPosition.N) - parseInt(a.itemPosition.N)
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(sortedItems),
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
