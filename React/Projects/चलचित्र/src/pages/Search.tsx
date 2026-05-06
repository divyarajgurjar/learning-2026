import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchVideos } from '../services/videoService';
import { YoutubeVideo, SortBy } from '../types';
import SearchResultItem from '../components/SearchResultItem';
import Navbar from '../components/Navbar';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>('latest');
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchVideos(1, 20, query, sortBy);
        if (data && data.data) {
          const filteredVideos = data.data
            .map(item => item.items)
            .filter(v => v && v.id && v.snippet);
          
          // Deduplicate by ID
          const uniqueVideos = Array.from(new Map(filteredVideos.map(v => [v.id, v])).values());
          
          setVideos(uniqueVideos);
          setTotalItems(data.totalItems || 0);
        } else {
          setVideos([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error('Search fetch failed:', error);
        setVideos([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    if (query) loadVideos();
  }, [query, sortBy]);

  const filters: { label: string; value: SortBy }[] = [
    { label: 'Relevance', value: 'mostViewed' }, // Mapping relevance to views for this demo
    { label: 'Upload Date', value: 'latest' },
    { label: 'View Count', value: 'mostViewed' },
  ];

  return (
    <div className="min-h-screen bg-background-dark text-text-primary">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex flex-col gap-6 pt-12 pb-8 border-b border-border-color">
          <div className="flex flex-wrap justify-between items-end gap-4 min-h-[80px]">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight font-sans">
              Results for: '{query}'
            </h1>
            <span className="text-text-muted text-sm font-medium">{totalItems} videos found</span>
          </div>
          
          <div className="flex gap-8 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={`${filter.value}-${filter.label}`}
                onClick={() => setSortBy(filter.value)}
                className={`flex flex-col items-center justify-center border-b-2 pb-2 transition-all whitespace-nowrap ${
                  sortBy === filter.value || (filter.label === 'Relevance' && sortBy === 'mostViewed')
                    ? 'border-primary text-text-primary' 
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                <p className="text-sm font-semibold tracking-wide uppercase">{filter.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-[40vh]">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            videos.map((video, index) => (
              <SearchResultItem key={`${video.id}-${index}`} video={video} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
