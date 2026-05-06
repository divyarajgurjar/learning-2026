import React from 'react';
import { Shield, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function WelcomeScreen({ onLogin, onRegister }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden grid-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center gap-12 w-full max-w-md"
      >
        <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <Card className="flex flex-col items-center gap-4 p-12 bg-white">
            <Shield size={64} fill="#1b1b1b" className="text-[#1b1b1b]" />
            <h1 className="text-5xl font-black italic tracking-tighter uppercase whitespace-nowrap">
              AUTH//CORE
            </h1>
          </Card>
        </div>

        <div className="bg-black text-[#ffe800] px-4 py-2 border-4 border-black font-bold tracking-widest text-sm">
          SYSTEM_READY_::_[V.1.0]
        </div>

        <div className="flex flex-col gap-6 w-full">
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full justify-between group"
            onClick={onLogin}
          >
            LOGIN
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Button>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full justify-between group bg-[#1b1b1b] text-[#ffe800]"
            onClick={onRegister}
          >
            REGISTER
            <UserPlus className="group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
