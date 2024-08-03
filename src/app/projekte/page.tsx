'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

interface Project {
    title: { S: string };
    description: { S: string };
    link: { S: string };
}

export default function Projekte() {
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        async function fetchProjects() {
            try {
                const restOperation = get({
                    apiName: 'postsget',
                    path: '/get',
                });
                const response = await restOperation.response;
                const data = await response.body.json();
                setProjects(data as any);
            } catch (error) {
                console.log('GET call failed: ', JSON.parse((error as any).response.body));
            }
        }
        fetchProjects();
    }, []);
    

    return (
        <div className="flex flex-col items-center mt-12 md:mt-20 h-screen">
            <h1 className="text-6xl">Projekte</h1>
            <div>
                <p className="text-2xl text-center m-2">Hier findest du alle Projekte, die ich bisher umgesetzt habe.</p>
            </div>
            
            <div className='w-full h-auto flex flex-col items-center space-y-2'>
                {projects.map((project: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg shadow-md">
                        <div className='w-full flex justify-end'>
                        </div>
                        <h2 className="text-xl font-bold">{project.title.S}</h2>
                        <p className="text-gray-700">{project.description.S}</p>
                        <p>{project.type.S}</p>
                        { project.type.S === 'image' ? 
                        <div>
                            <Image src={project.url.S} alt={project.title.S} width={200} height={200} />
                        </div>
                        : null}
                        { project.type.S === 'video' ? <div>
                            <video width="320" height="240" controls>
                                <source src={project.url.S} type="video/mp4" />
                            </video>
                        </div> : null}
                        { project.type.S === 'audio' ? <div>
                            <audio controls>
                                <source src={project.url.S} type="audio/mpeg" />
                            </audio>
                        </div> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
