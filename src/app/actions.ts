"use server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { getCurrentUser } from 'aws-amplify/auth';

const dynamoDBClient = new DynamoDBClient({
    region: 'us-east-1',
    
});

export async function createPost(title: string, description: string) {
    const user = await getCurrentUser();
    if (!user) {
        return { message: 'Unauthorized' };
    }

    const command = new PutItemCommand({
        TableName: 'Posts',
        Item: {
            'id': { S: user.username },
            'title': { S: title },
            'description': { S: description },
        },
    });

    try {
        await dynamoDBClient.send(command);
        return { message: 'Post created successfully' };
    } catch (error) {
        return { message: 'Post creation failed' };
    }

}


export async function sendMail(name: string, email: string, message: string) {
  try {
    const response = await fetch(
      "https://py39rvuzf9.execute-api.eu-central-1.amazonaws.com/dev/mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      },
    );

    if (response.ok) {
      return { message: "Email send successfully" };
    } else {
      return { message: "sending failed" };
    }
  } catch (error) {
    return { message: "error" };
  }
}