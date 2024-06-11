'use client';
import { Amplify } from 'aws-amplify';
import { get, ApiError } from 'aws-amplify/api';
import config from '@/amplifyconfiguration.json';
import React, { useEffect, useState } from 'react';

Amplify.configure(config);

interface Project {
    postId: string;
    title: string;
    artist: string;
    description: string;
    link: string;
    type: string;
    url: string;
    year: string;
}

const ProjektSection: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const restOperation = await get({
                    apiName: 'postsget',
                    path: '/get'
                });
                const response = await restOperation.response;
                const data = await response.body.json();
                console.log('GET call succeeded: ', data);

                // Check if data is an array before mapping
                if (Array.isArray(data)) {
                    const projects = data.map((item: any) => ({
                        postId: item.postId.S,
                        title: item.title.S,
                        artist: item.artist.S,
                        description: item.description.S,
                        link: item.link.S,
                        type: item.type.S,
                        url: item.url.S,
                        year: item.year.S,
                    }));

                    setProjects(projects);
                    setStatus('success');
                } else {
                    console.error('Unexpected response format:', data);
                    setStatus('failed');
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    if (error.response) {
                        const { statusCode, body } = error.response;
                        console.error(`Received ${statusCode} error response with payload: ${body}`);
                    }
                }
                console.error('GET call failed: ', error);
                setStatus('failed');
            }
        };

        getProjects();
    }, []);

    return (
        <div>
            {status === 'success' ? (
                <div>
                    <p>Request succeeded</p>
                    <div>
                        {projects.map((project) => (
                            <div key={project.postId} className='border dark:border-custom-orange border-black m-2'>
                                <h3>titel:{project.title}</h3>
                                <p>beschreibung:{project.description}</p>
                                <p>Artist: {project.artist}</p>
                                <p>Year: {project.year}</p>
                                <a href={project.link}>Link:{project.link}</a>
                                <a href={project.url}>URL:{project.url}</a>
                                <p>Type: {project.type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : status === 'failed' ? (
                <p>Request failed</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProjektSection;
