// app/projekte/page.tsx
import AWS from 'aws-sdk';

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
    const dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'eu-central-1'
    });

    const params = {
        TableName: 'projects-dev',
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return result.Items as Project[];
    } catch (error) {
        console.error('DynamoDB error: ', error);
        return [];
    }
}

export default async function Projekte() {
    const projects = await fetchProjects();

    return (
        <div className="flex flex-col items-center mt-12 md:mt-20 h-screen">
            <h1 className="text-6xl">Projekte</h1>
            <div>
                <p className="text-2xl text-center m-2">Hier findest du alle Projekte, die ich bisher umgesetzt habe.</p>
            </div>
            <div>
                <ul>
                    {projects.map((project) => (
                        <li key={project.postId} className="m-4 p-4 border-b">
                            <h2 className="text-4xl">{project.title}</h2>
                            <p className="text-xl">{project.description}</p>
                            <a href={project.url} className="text-blue-500">{project.url}</a>
                            {project.artist && <p>Künstler: {project.artist}</p>}
                            {project.year && <p>Jahr: {project.year}</p>}
                            {project.link && <a href={project.link} className="text-blue-500">{project.link}</a>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
