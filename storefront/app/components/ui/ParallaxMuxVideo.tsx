import MuxPlayer from '@mux/mux-player-react';
import {useState} from 'react';

type Props = {
  playbackId: string;
  className?: string;
};

/**
 * Mux stream for parallax / hero backgrounds. Fades in after load to reduce flash.
 */
export function ParallaxMuxVideo({playbackId, className = ''}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay
      muted
      loop
      playsInline
      thumbnailTime={0}
      preferPlayback="mse"
      className={className}
      onLoadedData={() => setVisible(true)}
      style={{
        width: '100%',
        height: '100%',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.55s ease-out',
      }}
    />
  );
}
