import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="h-24 flex items-center justify-center px-8 md:px-16 bg-transparent relative z-50 overflow-hidden">
      <Link to="/" className="flex flex-col items-center group relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-4xl font-serif tracking-[0.25em] font-light">Y</span>
          <div className="relative">
             <span className="text-4xl font-serif tracking-[0.25em] font-light">F</span>
             <motion.div 
               animate={{ scale: [1, 1.5, 1] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-accent rounded-full shadow-[0_0_10px_rgba(230,138,68,0.5)]" 
             />
          </div>
          <span className="text-4xl font-serif tracking-[0.25em] font-light">L</span>
        </motion.div>
        <span className="text-[10px] tracking-[0.5em] uppercase font-light mt-2 text-gray-500 group-hover:text-brand-accent transition-all duration-300">
          Your Food Lab
        </span>
      </Link>
    </nav>
  );
}
