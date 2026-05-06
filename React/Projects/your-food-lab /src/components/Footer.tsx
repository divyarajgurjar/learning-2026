import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative bg-brand-accent text-white pt-24 pb-12 px-8 md:px-12 overflow-hidden mt-20">
      {/* Background Gradient Effect - Adjusted for brand-accent background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/4 rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-black blur-[120px] opacity-5 rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto">

        {/* Large Divyaraj Text - Centered */}
        <div className="relative mb-20 flex justify-center overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[18vw] leading-[0.8] font-sans font-bold tracking-tighter text-white whitespace-nowrap text-center"
          >
            DIVYARAJ
          </motion.h2>
        </div>

        {/* Bottom Bar - Colors adjusted for contrast on orange */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-sans">
          <p className="text-white/80">Copyright © Divyaraj Studio</p>
          
          <div className="flex items-center gap-2 text-white/60">
            <Globe size={14} />
            <span>Brooklyn, NY</span>
          </div>

          <div className="flex gap-8">
            <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
