import { Play } from 'lucide-react';
import { YoutubeVideo } from '../types';
import { formatViews, timeAgo } from '../services/videoService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface SearchResultItemProps {
  video: YoutubeVideo;
}

export default function SearchResultItem({ video }: SearchResultItemProps) {
  const navigate = useNavigate();

  return (
    <motion.a 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/watch/${video.id}`, { state: { video } })}
      className="group flex flex-col md:flex-row gap-6 md:gap-8 hover:bg-surface p-4 -ml-4 rounded-sm transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full md:w-[360px] aspect-video bg-surface overflow-hidden flex-shrink-0 border border-border-color">
        <img 
          alt={video.snippet.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-85"
          src={video.snippet.thumbnails.high.url}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <Play size={48} className="text-white drop-shadow-2xl" fill="currentColor" />
        </div>
      </div>
      <div className="flex flex-col justify-start py-1">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 font-display group-hover:text-primary transition-colors leading-tight">
          {video.snippet.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
          <span className="font-medium text-text-primary">{video.snippet.channelTitle}</span>
          <span>•</span>
          <span>{formatViews(video.statistics.viewCount)}</span>
          <span>•</span>
          <span>{timeAgo(video.snippet.publishedAt)}</span>
        </div>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2 max-w-2xl">
          {video.snippet.description}
        </p>
      </div>
    </motion.a>
  );
}
