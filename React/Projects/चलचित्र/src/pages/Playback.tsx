import { ArrowLeft, Play, Pause, Volume2, VolumeX, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { YoutubeVideo } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { formatCompactNumber } from '../services/videoService';

export default function Playback() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const video = location.state?.video as YoutubeVideo | undefined;
  
  const [isIdle, setIsIdle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleAction = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 4000);
    };

    window.addEventListener('mousemove', handleAction);
    window.addEventListener('mousedown', handleAction);
    window.addEventListener('keydown', handleAction);
    
    timeout = setTimeout(() => setIsIdle(true), 4000);

    const fallbackTimer = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 6000);

    return () => {
      window.removeEventListener('mousemove', handleAction);
      window.removeEventListener('mousedown', handleAction);
      window.removeEventListener('keydown', handleAction);
      clearTimeout(timeout);
      clearTimeout(fallbackTimer);
    };
  }, [isLoading]);

  const handlePlayPause = () => {
    if (isPlayerReady) {
      setPlaying(prev => !prev);
    }
  };
  const handleToggleMute = () => setMuted(!muted);
  
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlayed(parseFloat(e.target.value));
  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    const player = playerRef.current;
    if (player && typeof player.seekTo === 'function') {
      player.seekTo(parseFloat(e.target.value));
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const Player = ReactPlayer as any;

  return (
    <div className={`fixed inset-0 bg-black text-text-primary overflow-hidden m-0 p-0 select-none flex items-center justify-center ${isIdle ? 'cursor-none' : 'cursor-default'}`}>
      
      {/* Primary Video Canvas - Direct mount to root for maximum visibility */}
      <Player
        key={id}
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${id}`}
        width="100%"
        height="100%"
        playing={isPlayerReady && playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress as any}
        onReady={() => {
          setIsPlayerReady(true);
          setIsLoading(false);
          const d = playerRef.current?.getDuration();
          if (d) setDuration(d);
          console.log("Player Ready for ID:", id);
        }}
        onStart={() => {
          setIsPlayerReady(true);
          setIsLoading(false);
        }}
        onError={(e: any) => {
          console.error('Playback Error:', e);
          setIsLoading(false);
        }}
        playsinline
        config={{
          youtube: {
            playerVars: { 
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              enablejsapi: 1
            }
          }
        } as any}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />

      {/* Transparent Interaction Layer */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={handlePlayPause} />

      {/* Top Experience Interface */}
      <AnimatePresence>
        {!isIdle && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full p-6 md:p-12 z-20 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none"
          >
            <div className="flex flex-col gap-6 pointer-events-auto">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 text-text-muted hover:text-white transition-all group/btn w-fit"
              >
                <ArrowLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Return to Gallery</span>
              </button>
              
              <div className="mt-4">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white drop-shadow-2xl max-w-5xl font-sans uppercase leading-tight">
                  {video?.snippet.title || 'Cinematic Masterpiece'}
                </h1>
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary mt-3 uppercase opacity-90">
                  {video?.snippet.channelTitle || 'Streaming Archive'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signal Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                 <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-text-muted animate-pulse">Establishing Signal</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Surface */}
      <AnimatePresence>
        {!isIdle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 w-full p-6 md:px-12 md:pb-14 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none"
          >
            <div className="flex flex-col gap-8 max-w-[1500px] mx-auto pointer-events-auto">
              <div className="relative w-full group/progress h-1.5 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-40"
                />
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-primary relative transition-all duration-300 ease-out" 
                    style={{ width: `${played * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full translate-x-1/2 scale-0 group-hover/progress:scale-100 transition-transform duration-200 border-2 border-white shadow-2xl" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-10">
                  <button onClick={handlePlayPause} className="hover:text-primary transition-all active:scale-90">
                    {playing ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                  </button>
                  <div className="flex items-center gap-4">
                    <button onClick={handleToggleMute} className="text-text-muted hover:text-white transition-colors">
                      {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input 
                      type="range" 
                      min={0} 
                      max={1} 
                      step="any" 
                      value={volume} 
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 h-1 bg-white/10 appearance-none rounded-full cursor-pointer accent-primary hidden lg:block"
                    />
                  </div>
                  <div className="text-[12px] font-bold tracking-[0.2em] flex gap-2 font-mono">
                    <span className="text-primary">{formatTime(played * (duration || 0))}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-text-muted">{formatTime(duration || 0)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 md:gap-12">
                   <div className="flex items-center gap-3">
                     <ThumbsUp size={20} className="text-text-muted transition-colors" />
                     <span className="text-[11px] font-bold font-sans tracking-widest text-text-muted">
                       {video?.statistics.likeCount ? formatCompactNumber(video.statistics.likeCount) : '—'}
                     </span>
                   </div>
                   <div className="flex items-center gap-3 group/dis">
                     <ThumbsDown size={20} className="text-text-muted group-hover/dis:text-white transition-colors" />
                     <span className="text-[11px] font-bold font-sans tracking-widest text-text-muted group-hover/dis:text-white">
                       DISLIKE
                     </span>
                   </div>
                   <div className="hidden sm:flex items-center gap-4 border-l border-white/10 pl-10 h-10 group/stat">
                     <div className="flex flex-col items-end">
                       <span className="text-[10px] font-bold tracking-widest text-primary/60 uppercase">Cumulative Views</span>
                       <span className="text-lg font-bold font-sans tracking-tight text-white group-hover/stat:text-primary transition-colors">
                         {video?.statistics.viewCount ? formatCompactNumber(video.statistics.viewCount) : '—'}
                       </span>
                     </div>
                     <Eye size={24} className="text-primary" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
