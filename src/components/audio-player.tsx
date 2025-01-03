"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaVolumeUp, FaStop } from "react-icons/fa";
import Image from "next/image";

interface AudioPlayerProps {
  src: string;
  image?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, image }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <<-- loading state

  const volumeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, []);

  // modified to accept 'autoPlay' to fix double-click
  const createWaveSurferInstance = (autoPlay: boolean) => {
    if (waveformRef.current && !wavesurfer.current) {
      setIsLoading(true); // we are loading now
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#525252",
        progressColor: "#ff6c2c",
        height: 80,
        barWidth: 2,
        barHeight: 1,
        barGap: 1,
        normalize: true,
      });
      wavesurfer.current.load(src);

      wavesurfer.current.on("ready", () => {
        setIsLoading(false); // done loading
        if (autoPlay) {
          wavesurfer.current?.play();
          setIsPlaying(true);
        }
      });

      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
      });
    }
  };

  // fix double-click by passing 'true' if wavesurfer nicht existiert
  const togglePlayPause = () => {
    if (!wavesurfer.current) {
      createWaveSurferInstance(true);
    } else {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop();
      setIsPlaying(false);
    }
  };

  const handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!wavesurfer.current) return;
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const clickPosition = rect.bottom - event.clientY;
    const newVolume = clickPosition / rect.height;
    wavesurfer.current.setVolume(newVolume);
    setVolume(newVolume);
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
    if (!showVolumeControl) {
      volumeTimeoutRef.current = window.setTimeout(() => {
        setShowVolumeControl(false);
      }, 5000);
    } else if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4 bg-black dark:bg-custom-orange rounded-lg shadow-md overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="Audio-Background-Image"
            fill
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Loading-Anzeige */}
      {isLoading && (
        <div className="absolute flex items-center justify-center w-full h-full bg-black/50 z-20">
          <span className="text-white">Loading ...</span>
        </div>
      )}

      <div ref={waveformRef} className="w-full h-20 m-4" />

      <div className="flex items-center gap-4 z-10">
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 text-black dark:text-custom-orange bg-custom-orange dark:bg-black rounded-full hover:scale-105 transition ease-in-out duration-200"
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        <button
          onClick={handleStop}
          className="text-black dark:text-custom-orange bg-custom-orange dark:bg-black rounded-full hover:scale-105 transition ease-in-out duration-200 p-2 m-4"
        >
          <FaStop size={16} />
        </button>

        <button
          onClick={toggleVolumeControl}
          className="text-black dark:text-custom-orange bg-custom-orange dark:bg-black rounded-full hover:scale-105 transition ease-linear duration-200 p-2"
        >
          <FaVolumeUp size={16} />
        </button>

        {showVolumeControl && (
          <div className="absolute flex items-center justify-center p-2 bg-black dark:bg-custom-orange rounded-lg shadow-md right-[10px] bottom-8 h-32">
            <div
              className="relative w-2 h-full bg-gray-300 rounded cursor-pointer"
              onClick={handleVolumeClick}
            >
              <div
                className="absolute bottom-0 left-0 w-full bg-custom-orange dark:bg-black rounded"
                style={{ height: `${volume * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
