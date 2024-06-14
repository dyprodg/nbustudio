import Image from "next/image";

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
