// app/projekte/page.tsx
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

interface Project {
    postId: string;
    type: string;
    title: string;
    description: string;
    url: string;
    artist?: string;
    year?: string;
    link?: string;
}

async function fetchProjects(): Promise<Project[]> {

    const client = new DynamoDBClient({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
    });



    const dynamoDb = DynamoDBDocumentClient.from(client);

    const params = {
        TableName: 'projects-dev',
    };

    try {
        const command = new ScanCommand(params);
        const result = await dynamoDb.send(command);
        return result.Items as Project[];
    } catch (error) {
        console.error('DynamoDB error: ', error);
        return [];
    }
}

export default async function Projekte() {

    return (
        <div className="flex flex-col items-center mt-12 md:mt-20 h-screen">
            <h1 className="text-6xl">Projekte</h1>
            <div>
                <p className="text-2xl text-center m-2">Hier findest du alle Projekte, die ich bisher umgesetzt habe.</p>
            </div>
            
        </div>
    );
}
