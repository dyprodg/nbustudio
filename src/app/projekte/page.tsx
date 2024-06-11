// app/projekte/page.tsx

import React from 'react';

async function fetchProjects() {
    const response = await fetch('https://qb8lpr0b19.execute-api.eu-central-1.amazonaws.com/dev/get');
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return response.json();
}

export default async function Projekte() {
    const projects = await fetchProjects();

    return (
        <div className="flex flex-col items-center mt-12 md:mt-20 h-screen">
            <h1 className="text-6xl">Projekte</h1>
            <div>
                <p className="text-2xl text-center m-2">Hier findest du alle Projekte, die ich bisher umgesetzt habe.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {projects.map((project: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">{project.title.S}</h2>
                        <p className="text-gray-700">{project.description.S}</p>
                        <a href={project.link.S} className="text-blue-500 underline">Mehr erfahren</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
