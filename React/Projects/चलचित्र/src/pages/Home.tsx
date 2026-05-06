import { useEffect, useState } from 'react';
import { fetchVideos } from '../services/videoService';
import { YoutubeVideo } from '../types';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        // Using an empty string for the query to fetch all available videos in the limited dataset
        const data = await fetchVideos(page, 12, '', 'mostViewed');
        if (data && data.data) {
          // Robust mapping: ensure item.items exists and has an id
          const filteredVideos = data.data
            .map((item: any) => item.items)
            .filter((v: any) => v && v.id && v.snippet);
          
          // Deduplicate by ID to avoid React key warnings
          const uniqueVideos = Array.from(new Map(filteredVideos.map(v => [v.id, v])).values());
          
          setVideos(uniqueVideos);
          setTotalPages(data.totalPages || 1);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error('Initial fetch failed:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Target: main content area */}
      <main id="home-main" className="flex-grow p-6 md:p-10 max-w-[1600px] mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-10 h-10 border-2 border-surface border-t-primary rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-[4px] font-bold text-text-muted animate-pulse font-sans">
              Curating Gallery
            </span>
          </div>
        ) : (
          <>
            {videos.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              >
                {videos.map((video, index) => (
                  <VideoCard key={`${video.id}-${index}`} video={video} />
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh] text-text-muted">
                <p className="text-sm uppercase tracking-widest font-sans">No cinematic works found</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 text-xs underline hover:text-primary transition-colors font-sans"
                >
                  Retry Connection
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="h-24 flex items-center justify-center border-t border-border-color mt-auto bg-background-dark">
        <nav className="flex gap-12 items-center">
          <button 
            disabled={page === 1}
            onClick={() => {
              setPage(p => p - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-bold text-[13px] text-text-muted hover:text-primary uppercase tracking-[3px] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group flex items-center gap-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
          </button>
          
          <div className="flex gap-4 items-center">
            {[...Array(Math.min(totalPages, 3))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-2 h-2 transition-all duration-500 rounded-none ${
                    page === i + 1 ? 'bg-primary scale-125' : 'bg-surface hover:bg-text-muted'
                }`}
              />
            ))}
          </div>

          <button 
            disabled={page === totalPages}
            onClick={() => {
              setPage(p => p + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-bold text-[13px] text-text-primary hover:text-primary uppercase tracking-[3px] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group flex items-center gap-2"
          >
            Next <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}
