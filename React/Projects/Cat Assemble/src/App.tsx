/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Info, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface CatData {
  id: string | number;
  name: string;
  alt_names?: string;
  origin: string;
  description: string;
  life_span: string;
  image: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  wikipedia_url?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  temperament: string;
  // Stats
  indoor: number;
  lap: number;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  hypoallergenic: number;
}

interface ApiResponse {
  statusCode: number;
  data: CatData;
  message: string;
  success: boolean;
}

const API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random';

const StatRow = ({ label, value, max = 5 }: { label: string; value: number; max?: number }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-primary/70">
        <span>{label}</span>
        <span>{String(value).padStart(2, '0')}</span>
      </div>
      <div className="flex gap-[2px] h-[4px] w-full">
        {Array.from({ length: max * 2 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-colors duration-500 ${
              i < value * 2 ? 'bg-primary' : 'bg-surface'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const BinaryStat = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex justify-between py-2 border-b border-surface items-center">
      <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">{label}</span>
      <span className={`font-mono text-xs uppercase ${value ? 'text-primary font-bold' : 'text-secondary/40 line-through'}`}>
        {value ? 'Yes' : 'No'}
      </span>
    </div>
  );
};

export default function App() {
  const [cat, setCat] = useState<CatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCat = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const result: ApiResponse = await response.json();
      if (result.success) {
        setCat(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch cat');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCat();
  }, [fetchCat]);

  const navLinks = [
    { label: 'CFA Site', key: 'cfa_url' },
    { label: 'Vetstreet', key: 'vetstreet_url' },
    { label: 'VCA Hospital', key: 'vcahospitals_url' },
    { label: 'Wikipedia', key: 'wikipedia_url' },
  ] as const;

  if (error && !cat) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-display mb-2 uppercase">Critical Fault</h2>
        <p className="text-secondary max-w-md mb-6">{error}</p>
        <button
          onClick={fetchCat}
          className="border border-primary px-8 py-3 font-mono text-sm uppercase hover:bg-primary hover:text-white transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reconnect
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-background/90 backdrop-blur-md border-b border-primary z-50 px-6 md:px-10 flex items-center justify-between">
        <div className="font-display text-2xl font-bold tracking-tighter uppercase leading-none">
          Cat ASSEMBLE
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const url = cat ? (cat[link.key] as string) : null;
            return (
              <a
                key={link.label}
                href={url || '#'}
                target="_blank"
                rel="noreferrer"
                className={`font-mono text-[11px] uppercase tracking-widest transition-all ${
                  url
                    ? 'text-secondary hover:text-primary hover:underline underline-offset-4'
                    : 'text-secondary/20 cursor-not-allowed line-through'
                }`}
                onClick={(e) => !url && e.preventDefault()}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a 
          href="https://x.com/DevDivyaraj" 
          target="_blank" 
          rel="noreferrer"
          className="bg-primary text-white font-mono text-[11px] uppercase px-6 py-3 tracking-widest hover:invert transition-all duration-300 inline-block"
        >
          Connect with designer
        </a>
      </header>

      <main className="flex flex-col md:flex-row min-h-screen pt-20">
        {/* Left: Image Section */}
        <section className="w-full md:w-1/2 md:fixed md:left-0 md:top-20 md:bottom-0 border-r border-primary bg-surface overflow-hidden relative group">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
              </motion.div>
            ) : (
              <motion.div
                key={cat?.image || 'placeholder'}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full"
              >
                <img
                  src={cat?.image}
                  className="w-full h-full object-cover grayscale-heavy"
                  alt={cat?.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 p-6 bg-white/95 border-r border-t border-primary hidden md:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    Plate {cat?.id ? String(cat.id).padStart(3, '0') : '000'} // Archetype
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute top-0 right-0 p-3 bg-white/95 border-l border-b border-primary">
            <span className="font-mono text-[9px] uppercase tracking-widest cursor-help hover:underline">
              MOST WANTED
            </span>
          </div>
        </section>

        {/* Right: Content Section */}
        <section className="w-full md:w-1/2 md:ml-[50%] px-6 py-12 md:px-16 lg:px-24">
          <div className="max-w-xl mx-auto space-y-16">
            
            {/* Header Content */}
            <div className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={fetchCat}
                  disabled={loading}
                  className="border border-primary px-6 py-2 font-mono text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? 'Analyzing...' : 'Next Subject'}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <header className="border-b border-primary/20 pb-8">
                <motion.h1 
                  key={`name-${cat?.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-7xl font-display font-black leading-none uppercase"
                >
                  {cat?.name || '---'}
                </motion.h1>
                <motion.p 
                  key={`alt-${cat?.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl md:text-2xl font-display italic text-secondary mt-2"
                >
                  {cat?.alt_names || cat?.temperament?.split(',')[0] || 'Unknown Origin'}
                </motion.p>
              </header>
            </div>

            {/* Metrics Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-primary" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Metric Profiling</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                <StatRow label="Intelligence" value={cat?.intelligence || 0} />
                <StatRow label="Energy Level" value={cat?.energy_level || 0} />
                <StatRow label="Affection" value={cat?.affection_level || 0} />
                <StatRow label="Grooming" value={cat?.grooming || 0} />
                <StatRow label="Adaptability" value={cat?.adaptability || 0} />
                <StatRow label="Child Friendly" value={cat?.child_friendly || 0} />
                <StatRow label="Dog Friendly" value={cat?.dog_friendly || 0} />
                <StatRow label="Health Issues" value={cat?.health_issues || 0} />
                <StatRow label="Social Needs" value={cat?.social_needs || 0} />
                <StatRow label="Stranger Friendly" value={cat?.stranger_friendly || 0} />
                <StatRow label="Shedding" value={cat?.shedding_level || 0} />
                <StatRow label="Vocalisation" value={cat?.vocalisation || 0} />
              </div>
            </section>

            {/* Narrative Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-primary" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Taxonomy & History</h3>
              </div>
              <div className="space-y-6">
                <p className="font-display text-2xl leading-snug text-primary/90">
                  {cat?.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat?.temperament.split(',').map((t) => (
                    <span key={t} className="px-3 py-1 bg-surface border border-surface-variant text-[10px] font-mono uppercase tracking-widest">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Technical Specs Section */}
            <section className="space-y-4 pt-12 border-t border-primary/10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 text-center">Archive Registry</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div className="space-y-0">
                  <div className="flex justify-between py-2 border-b border-surface">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Origin</span>
                    <span className="font-mono text-xs uppercase text-primary font-medium">{cat?.origin}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Life Span</span>
                    <span className="font-mono text-xs uppercase text-primary font-medium">{cat?.life_span} YRS</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Weight (Metric)</span>
                    <span className="font-mono text-xs uppercase text-primary font-medium">{cat?.weight.metric} KG</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Weight (Imperial)</span>
                    <span className="font-mono text-xs uppercase text-primary font-medium">{cat?.weight.imperial} LBS</span>
                  </div>
                </div>

                <div className="space-y-0">
                  <BinaryStat label="Indoor" value={cat?.indoor || 0} />
                  <BinaryStat label="Lap Cat" value={cat?.lap || 0} />
                  <BinaryStat label="Hypoallergenic" value={cat?.hypoallergenic || 0} />
                  <BinaryStat label="Rare Breed" value={cat?.rare || 0} />
                </div>
              </div>

              {/* Minor Traits */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-6">
                {[
                  { l: "Hairless", v: cat?.hairless },
                  { l: "Natural", v: cat?.natural },
                  { l: "Rex", v: cat?.rex },
                  { l: "Sup. Tail", v: cat?.suppressed_tail },
                  { l: "Short Legs", v: cat?.short_legs },
                  { l: "Exp.", v: cat?.experimental }
                ].map((trait, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-2 bg-surface/50">
                    <span className="font-mono text-[8px] uppercase tracking-tighter text-secondary">{trait.l}</span>
                    <span className={`text-[10px] font-bold ${trait.v ? 'text-primary' : 'text-primary/10'}`}>
                      {trait.v ? 'TRUE' : 'VOID'}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-20 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-primary/20">
              <p className="font-mono text-[9px] uppercase tracking-widest text-secondary">
                © 2026 CAT ASSEMBLE CREATED BY DIVYARAJ GURJAR ARCHIVE. INTEGRITY VERIFIED.
              </p>
              <div className="flex gap-6">
                <a href="#" className="font-mono text-[9px] uppercase hover:underline">Guidelines</a>
                <a href="#" className="font-mono text-[9px] uppercase hover:underline">Archives</a>
                <a href="#" className="font-mono text-[9px] uppercase hover:underline">Privacy</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Mobile Nav Bar - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-primary flex items-center justify-around z-50">
        <button onClick={fetchCat} className="flex flex-col items-center gap-1">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span className="font-mono text-[8px] uppercase">Analyze</span>
        </button>
        <div className="flex flex-col items-center gap-1 opacity-20">
          <Info className="w-5 h-5" />
          <span className="font-mono text-[8px] uppercase">Registry</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-20">
          <ExternalLink className="w-5 h-5" />
          <span className="font-mono text-[8px] uppercase">Sources</span>
        </div>
      </nav>
    </div>
  );
}
