'use client'
import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '@/amplifyconfiguration.json';
import { post } from 'aws-amplify/api';
import { fetchAuthSession } from '@aws-amplify/auth';
Amplify.configure(config);


function Page({ signOut, user }: WithAuthenticatorProps) {
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');

    const handlePost = async () => {
        const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
        try {
            const restOperation = post({
                apiName: 'post',
                path: '/create',
                options: {
                    headers: {
                        Authorization: `Bearer ${authToken}`, 
                    },
                    body: {
                        "type": "image",
                        "title": "test",
                        "description": "This is a test video description.",
                        "url": "https://example.com/test-video",
                        "artist": "Test Artist",
                        "year": "2024",
                        "link": "https://example.com"
                    }
                }
            });

            const { body } = await restOperation.response;
            const response = await body.json();

            console.log('POST call succeeded');
            console.log(response);
        } catch (e) {
            console.log('POST call failed: ', JSON.parse((e as any).response.body));
        }
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
                <button
                    onClick={handlePost}
                    className='text-2xl border hover:scale-105 p-4 hover:cursor-pointer active:scale-95 transition ease-in-out duration-100 bg-black'
                >
                    Erstellen
                </button>
            </div>
        </div>
    );
}

export default withAuthenticator(Page);
