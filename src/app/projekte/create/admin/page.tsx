'use client'
import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '@/amplifyconfiguration.json';
import { post, get } from 'aws-amplify/api';
import { fetchAuthSession } from '@aws-amplify/auth';
import crypto from 'crypto';
import { uploadData, remove } from 'aws-amplify/storage';
import Image from 'next/image';
Amplify.configure(config);

interface Project {
    title: { S: string };
    description: { S: string };
    link: { S: string };
}

function Page({ signOut, user }: WithAuthenticatorProps) {
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);

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

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handlePost = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const genereateRandomName = () => {
            return crypto.randomBytes(16).toString('hex');
        };
        const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        const filetype = file.type;
        const filename = `${genereateRandomName()}.${filetype.split('/')[1]}`;

        if(!authToken) {
            console.error('No auth token');
            return;
        }

        const monitorUpload = async () => {
            try {
                const result = await uploadData({
                    path: `uploads/${filename}`,
                    data: file,
                    options: {
                        onProgress: ({ transferredBytes, totalBytes }) => {
                            if (totalBytes) {
                                const progress = Math.round((transferredBytes / totalBytes) * 100);
                                setUploadProgress(progress);
                                console.log(`Upload progress ${progress}%`);
                            }
                        }
                    }
                }).result;
                console.log("Path from Response: ", result.path)
            } catch (error) {
                console.log("Error uploading file: ", error)
            }
        }
        monitorUpload();

        try {
            const restOperation = post({
                apiName: 'post',
                path: '/create',
                options: {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: {
                        type: filetype.split('/')[0],
                        title: postTitle,
                        description: postDesc,
                        url: `https://d2h4n766jut7m4.cloudfront.net/uploads/${filename}`,
                        filename: filename,
                    },
                },
            });

            const { body } = await restOperation.response;
            const response = await body.json();
            console.log('POST call successfull', response);
            setFile(null);
            setPostTitle('');
            setPostDesc('');
            setUploadProgress(0);
        } catch (e) {
            console.log('POST call failed: ', JSON.parse((e as any).response.body));
        }
        fetchProjects();
    };

    const handleDelete = async (id: string , name: string) => {
        const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        try {
            const restOperation = post({
                apiName: 'post',
                path: '/delete',
                options: {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: {
                        postId: id,
                    },
                },
            });

            const { body } = await restOperation.response;
            const response = await body.json();

            try {
                await remove({
                    path: name,
                })
            } catch (error) {
                console.log("Error deleting file: ", error)
            }

            console.log('DELETE call successfull', response);
            
        } catch (error) {
            console.log('DELETE call failed: ', JSON.parse((error as any).response.body));
        }
        fetchProjects();
    };

    return (
        <div className='flex mt-20 flex-col w-full min-h-screen '>
            <div className='text-2xl flex justify-center items-center'>
                <h1>Hello {user?.username}</h1>
                <button
                    onClick={signOut}
                    className='border-2 p-4 m-4 text-bold border-black dark:border-custom-orange hover:cursor-pointer active:scale-105'
                >
                    Sign out
                </button>
            </div>

            <div className='flex flex-col m-10 max-w-[800px] text-white'>
                <input
                    className='bg-black text-white p-4 border border-white placeholder:text-gray-300 text-xl'
                    placeholder='Titel'
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                    className='bg-black text-white border border-white resize-none placeholder:text-gray-300 text-xl p-4'
                    rows={6}
                    placeholder='Beschreibung'
                    value={postDesc}
                    onChange={(e) => setPostDesc(e.target.value)}
                />
                <input
                    type='file'
                    onChange={handleFileChange}
                    className='bg-black text-white border border-white p-4 mt-4'
                />
                <button
                    onClick={handlePost}
                    className='text-2xl border hover:scale-105 p-4 hover:cursor-pointer active:scale-95 transition ease-in-out duration-100 bg-black mt-4'
                >
                    Erstellen
                </button>
                {uploadProgress > 0 && (
                    <div className='w-full bg-gray-200 rounded-full mt-4'>
                        <div
                            className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
                            style={{ width: `${uploadProgress}%` }}
                        >
                            {uploadProgress}%
                        </div>
                    </div>
                )}
            </div>
            <div className='w-full h-auto flex flex-col items-center space-y-2'>
                {projects.map((project: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg shadow-md">
                        <div className='w-full flex justify-end'>
                            <button
                                className='border-2 p-2 border-black dark:border-custom-orange hover:cursor-pointer active:scale-105 hover:scale-105'
                                onClick={() => handleDelete(project.postId.S, `uploads/${project.filename.S}`)}
                            >Delete</button>
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

export default withAuthenticator(Page);
