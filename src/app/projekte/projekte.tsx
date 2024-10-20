"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { get } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import AudioPlayer from "@/components/audio-player";
import Kontakt from "../kontakt/page";
import Footer from "@/components/footer";
Amplify.configure(config);

interface Project {
  title: { S: string };
  description: { S: string };
  link: { S: string };
}

export default function Projekte() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); // Ladezustand

  useEffect(() => {
    async function fetchProjects() {
      try {
        const restOperation = get({
          apiName: "postsget",
          path: "/get",
        });
        const response = await restOperation.response;
        const data = await response.body.json();
        setProjects(data as any);
        setLoading(false); // Ladezustand nach erfolgreichem Laden beenden
      } catch (error) {
        console.log(
          "GET call failed: ",
          JSON.parse((error as any).response.body),
        );
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      <h1 className="text-6xl font-bold">Projekte</h1>
      <div>
        <p className="text-2xl text-center m-2 w-[380px]">
          Hier findest du alle Projekte, die ich bisher umgesetzt habe.
        </p>
      </div>

      <div className="w-full h-auto flex flex-col items-center space-y-2 mt-8">
        {loading ? (
          <p className="text-2xl text-center">Lädt Projekte...</p>
        ) : (
          projects.map((project: any, index: number) => (
            <div
              key={index}
              className="bg-gradient-to-br from-custom-orange dark:from-black from-0% via-custom-orange dark:via-black via-60% to-black dark:to-custom-orange to-80 md:to-70%
                        p-4 border-2 shadow-xl border-black dark:border-custom-orange rounded-lg w-[380px] md:w-[700px] lg:w-[1000px] flex flex-col items-center text-center md:flex-row md:items-center md:text-left justify-between"
            >
              <div className="flex flex-col h-full justify-evenly space-y-4 w-full md:w-[30%] m-2">
                <h2 className="text-3xl font-bold uppercase">
                  {project.title.S}
                </h2>
                <p className="text-black dark:text-custom-orange">
                  {project.description.S}
                </p>
                {project.link && (
                  <a className="text-xs underline" href={project.link.S}>
                    {project.link.S}
                  </a>
                )}
              </div>

              {project.type.S === "image" ? (
                <div className="w-[280px] md:w-[380px] lg:w-[600px] max-h-[600px] bg-black border-2 border-black dark:border-custom-orange rounded-xl overflow-hidden">
                  <Image
                    src={project.url.S}
                    alt={project.title.S}
                    width={1920}
                    height={1080}
                  />
                </div>
              ) : null}
              {project.type.S === "video" ? (
                <div className="bg-black border-2 border-black dark:border-custom-orange rounded-2xl">
                  <video
                    className="w-[280px] md:w-[380px] lg:w-[600px] max-h-[500px] rounded-xl"
                    controls
                  >
                    <source src={project.url.S} type="video/mp4" />
                  </video>
                </div>
              ) : null}

              {project.type.S === "audio" ? (
                <div>
                  <div className="border-2 border-black dark:border-custom-orange rounded-xl  w-[280px] md:w-[380px] lg:w-[600px] hidden md:flex md:flex-col">
                    <AudioPlayer
                      src={project.url.S}
                      image={project.imageUrl ? project.imageUrl.S : undefined}
                    />
                  </div>
                  <div className="p-5 w-[280px] md:w-[380px] lg:w-[600px] flex md:hidden">
                    <audio controls src={project.url.S} />
                  </div>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
      <div className="mt-48 md:mt-0">
        <Kontakt />
      </div>
    </div>
  );
}
