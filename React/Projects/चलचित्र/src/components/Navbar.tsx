import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  const isSearchPage = location.pathname === '/search';

  return (
    <header className="sticky top-0 z-50 h-16 bg-background-dark border-b border-border-color flex items-center justify-between px-6 md:px-10">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 text-primary">
          <svg viewBox="0 0 48 48" fill="currentColor">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
          </svg>
        </div>
        <h1 
          onClick={() => navigate('/')}
          className="font-sans font-bold text-xl text-text-primary uppercase tracking-[0.2em] cursor-pointer hover:text-primary transition-colors"
        >
          {isSearchPage ? 'खोज' : 'चलचित्र'}
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        {(isSearchOpen || isSearchPage) ? (
          <form onSubmit={handleSearch} className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="relative group">
              <div className="flex w-64 md:w-80 items-stretch rounded-sm bg-surface border border-border-color focus-within:border-primary transition-colors h-10">
                <div className="text-text-muted flex items-center justify-center pl-3 pr-2">
                  <Search size={18} />
                </div>
                <input
                  autoFocus
                  className="bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-muted px-2 text-sm w-full outline-hidden"
                  placeholder="Cinematography Techniques..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {!isSearchPage && (
                  <button 
                    type="button" 
                    onClick={() => setIsSearchOpen(false)}
                    className="pr-3 text-text-muted hover:text-text-primary transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-text-muted hover:text-text-primary transition-all duration-300 hover:scale-110"
          >
            <Search size={22} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </header>
  );
}

