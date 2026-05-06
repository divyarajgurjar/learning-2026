/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCcw, XCircle, Loader2 } from "lucide-react";
import { BackgroundRays } from "./components/BackgroundRays";
import { FooterBadge } from "./components/FooterBadge";

interface Joke {
  setup: string;
  punchline: string;
}

export default function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowPunchline(false);
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"
      );
      if (!response.ok) throw new Error("Failed to fetch joke");
      const json = await response.json();
      
      if (json.success && json.data) {
        const content = json.data.content;
        
        // Smart split for content: if it has a question mark, split there.
        // Otherwise, use a generic suspenseful setup.
        const qIndex = content.indexOf('?');
        if (qIndex !== -1 && qIndex < content.length - 1) {
          setJoke({
            setup: content.substring(0, qIndex + 1).trim(),
            punchline: content.substring(qIndex + 1).trim()
          });
        } else {
          setJoke({
            setup: "HERE COMES THE JOKE...",
            punchline: content
          });
        }
      } else {
        throw new Error(json.message || "Invalid API response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "API Rate Limited");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 selection:bg-violet-500/30">
      <BackgroundRays />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={error ? "error" : loading ? "loading" : "card"}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card w-full max-w-[480px] min-h-[520px] rounded-[32px] p-10 flex flex-col items-center justify-between relative overflow-hidden"
        >
          {/* Top Decorative Element */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {loading ? (
            <div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">
              <div className="w-full space-y-4">
                <div className="h-10 w-[90%] mx-auto bg-white/10 rounded-lg animate-pulse" />
                <div className="h-10 w-[70%] mx-auto bg-white/10 rounded-lg animate-pulse delay-75" />
              </div>
              <div className="h-6 w-[50%] bg-white/5 rounded-lg animate-pulse delay-150" />
              <div className="absolute bottom-12">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="font-heading text-4xl font-extrabold uppercase tracking-widest text-red-50">
                {error}
              </h1>
              <button
                onClick={fetchJoke}
                className="glass-button px-8 py-4 rounded-full font-heading font-semibold text-xs tracking-widest uppercase hover:text-white"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex-1 w-full flex flex-col items-center justify-center text-center">
              <motion.h1
                layout
                className="font-heading text-[32px] md:text-[36px] font-extrabold leading-[1.2] tracking-[2px] uppercase mb-8"
              >
                {joke?.setup}
              </motion.h1>

              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  {!showPunchline ? (
                    <motion.button
                      key="reveal-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setShowPunchline(true)}
                      className="glass-button px-10 py-5 rounded-full font-body font-semibold text-[13px] tracking-[1px] uppercase group"
                    >
                      Reveal Punchline
                      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="punchline-area"
                      className="flex flex-col items-center space-y-12 w-full"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-body text-xl text-[var(--color-text-muted)] leading-relaxed max-w-[320px]"
                      >
                        {joke?.punchline}
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={fetchJoke}
                        className="glass-button px-8 py-4 rounded-full font-body font-semibold text-[13px] tracking-[1px] uppercase flex items-center gap-3 group"
                      >
                        <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-[360deg] duration-700 ease-in-out" />
                        Get Another Laugh
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <FooterBadge />
    </main>
  );
}

