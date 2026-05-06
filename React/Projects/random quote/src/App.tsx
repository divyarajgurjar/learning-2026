/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCcw, XCircle, Loader2, ChevronLeft, ChevronRight, Quote as QuoteIcon } from "lucide-react";
import { BackgroundRays } from "./components/BackgroundRays";
import { FooterBadge } from "./components/FooterBadge";

interface Quote {
  id: number;
  content: string;
  author: string;
}

interface PaginationData {
  page: number;
  totalPages: number;
  nextPage: boolean;
  previousPage: boolean;
}

export default function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async (targetPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/quotes?page=${targetPage}&limit=4`
      );
      if (!response.ok) throw new Error("Failed to fetch quotes");
      const json = await response.json();
      
      if (json.success && json.data) {
        setQuotes(json.data.data);
        setPagination({
          page: json.data.page,
          totalPages: json.data.totalPages,
          nextPage: json.data.nextPage,
          previousPage: json.data.previousPage,
        });
      } else {
        throw new Error(json.message || "Invalid API response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "API Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes(page);
  }, [fetchQuotes, page]);

  const handleNextPage = () => {
    if (pagination?.nextPage) setPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (pagination?.previousPage) setPage(p => p - 1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 selection:bg-violet-500/30 font-body">
      <BackgroundRays />
      
      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-[4px] text-white brightness-125">
            Wisdom <span className="text-violet-400">Vault</span>
          </h1>
          <p className="text-white/40 text-sm tracking-[2px] uppercase mt-2">Curated Philosophical Fragments</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card w-full rounded-[32px] p-12 min-h-[500px] flex flex-col items-center justify-center space-y-8"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full space-y-3">
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-white/5 rounded animate-pulse ml-auto" />
                </div>
              ))}
              <Loader2 className="w-10 h-10 animate-spin text-violet-400/50 mt-8" />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card w-full rounded-[32px] p-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              <XCircle className="w-16 h-16 text-red-400/50" />
              <h2 className="font-heading text-2xl uppercase tracking-widest text-red-100">{error}</h2>
              <button
                onClick={() => fetchQuotes(page)}
                className="glass-button px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold"
              >
                Retry Request
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-4"
            >
              {/* Pagination Controls moved to top as a "Navbar" */}
              <div className="flex items-center justify-between px-2 pb-2">
                <button
                  disabled={!pagination?.previousPage}
                  onClick={handlePrevPage}
                  className="glass-button p-4 rounded-full disabled:opacity-20 disabled:cursor-not-allowed group transition-all"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="glass-button px-6 py-3 rounded-full flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[3px] text-white/40 font-bold">Page</span>
                  <span className="text-lg font-heading font-black text-violet-400">
                    {pagination?.page}
                  </span>
                  <span className="text-xs uppercase tracking-[3px] text-white/40 font-bold">Of {pagination?.totalPages}</span>
                </div>

                <button
                  disabled={!pagination?.nextPage}
                  onClick={handleNextPage}
                  className="glass-button p-4 rounded-full disabled:opacity-20 disabled:cursor-not-allowed group transition-all"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="glass-card rounded-[32px] p-2 overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {quotes.map((quote, idx) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                    >
                      <QuoteIcon className="absolute -top-1 -left-1 w-8 h-8 text-violet-500/10 group-hover:text-violet-500/20 transition-colors" />
                      <p className="text-lg text-white/90 leading-relaxed font-medium">
                        "{quote.content}"
                      </p>
                      <div className="mt-4 flex items-center justify-end">
                        <div className="h-[1px] w-8 bg-violet-500/30 mr-3" />
                        <span className="text-sm font-semibold tracking-wider text-violet-300/80 uppercase italic">
                          {quote.author}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FooterBadge />
    </main>
  );
}

