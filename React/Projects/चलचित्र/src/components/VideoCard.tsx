import { Play } from 'lucide-react';
import { YoutubeVideo } from '../types';
import { formatViews, timeAgo } from '../services/videoService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface VideoCardProps {
  video: YoutubeVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/watch/${video.id}`, { state: { video } })}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <div className="relative w-full aspect-video bg-surface overflow-hidden border border-border-color">
        <img 
          alt={video.snippet.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
          src={video.snippet.thumbnails.high.url}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-primary/90 p-4 rounded-full text-white shadow-2xl">
            <Play fill="currentColor" size={24} />
          </div>
        </div>
        {video.contentDetails?.duration && (
           <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
             HD
           </div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="font-sans font-medium text-[15px] text-text-primary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {video.snippet.title}
        </h3>
        <p className="font-sans text-[13px] text-text-muted mt-1">{video.snippet.channelTitle}</p>
        <p className="font-sans text-[13px] text-text-muted mt-0.5">
          {formatViews(video.statistics.viewCount)} • {timeAgo(video.snippet.publishedAt)}
        </p>
      </div>
    </motion.article>
  );
}
