import React, { useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume set to max (1)
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const volumeTimeoutRef = useRef<number | undefined>(undefined);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const clickPosition = rect.bottom - event.clientY; 
    const newVolume = clickPosition / rect.height;
    audioRef.current.volume = newVolume;
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
    <div className="relative flex items-center gap-4 p-4 bg-black dark:bg-custom-orange rounded-lg shadow-md">
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
      <button
        onClick={togglePlayPause}
        className="px-4 py-2 text-black dark:text-custom-orange bg-custom-orange dark:bg-black rounded-full hover:scale-105 transition ease-in-out duration-200"
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>
      <div
        className="relative w-full h-2 bg-gray-300 rounded cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-custom-orange dark:bg-black rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        onClick={toggleVolumeControl}
        className="text-black dark:text-custom-orange bg-custom-orange dark:bg-black rounded-full hover:scale-105 transition ease-linear duration-200 p-2"
      >
        <FaVolumeUp size={16} />
      </button>
      {showVolumeControl && (
        <div className="absolute flex items-center justify-center p-2 bg-black dark:bg-custom-orange rounded-lg shadow-md right-[25px] bottom-16 h-32">
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
  );
};

export default AudioPlayer;
