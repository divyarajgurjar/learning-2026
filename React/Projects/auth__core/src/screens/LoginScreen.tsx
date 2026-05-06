import React, { useState } from 'react';
import { Shield, LogIn, ChevronLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onBack: () => void;
}

export function LoginScreen({ onBack }: LoginScreenProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffe800] flex items-center justify-center p-6 font-mono">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="relative bg-white flex flex-col gap-8 p-10">
          <header className="border-b-4 border-black pb-6 space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-black uppercase tracking-tighter">[SYS_LOGIN]</h1>
              <button onClick={onBack} className="hover:scale-110 transition-transform">
                <ChevronLeft size={32} strokeWidth={3} />
              </button>
            </div>
            <p className="text-sm font-bold opacity-60 uppercase">AUTH//CORE V2.4</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input 
              label="ENTER_ID" 
              placeholder="USER_IDENTIFIER" 
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <Input 
              label="ENTER_KEY" 
              type="password" 
              placeholder="••••••••••••" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {error && (
              <div className="bg-[#FF3366] text-white p-4 border-4 border-black font-bold text-sm">
                ERROR :: {error.toUpperCase()}
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-20 mt-4 bg-black text-white hover:bg-[#1b1b1b]"
              disabled={loading}
            >
              {loading ? 'VERIFYING...' : 'ACCESS'}
              <LogIn />
            </Button>
          </form>

          <footer className="border-t-4 border-black pt-6 flex items-center gap-3">
            <div className="w-4 h-4 bg-[#ffe800] border-2 border-black animate-pulse" />
            <span className="text-xs font-bold uppercase opacity-60">SYS_STATUS: ONLINE</span>
          </footer>
        </Card>
      </motion.div>
    </div>
  );
}
