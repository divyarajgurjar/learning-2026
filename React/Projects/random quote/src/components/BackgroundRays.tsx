/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export function BackgroundRays() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[#05050A]">
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Vertical Streaks - matching the user image style */}
      <div className="absolute inset-0 flex justify-around opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1], height: '100%' }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "easeInOut" 
            }}
            className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
          />
        ))}
      </div>

      {/* Main Ambient Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, var(--color-ray-1), transparent 70%)' }}
      />
      
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-ray-2), transparent 70%)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-[#05050A] opacity-60" />
    </div>
  );
}
