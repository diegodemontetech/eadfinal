import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  onProgress: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
}

const VideoPlayer = ({ url, onProgress }: VideoPlayerProps) => {
  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        onProgress={onProgress}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;