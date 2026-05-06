import React, { useState } from 'react';
import { Shield, UserPlus, ChevronLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

interface RegisterScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function RegisterScreen({ onBack, onSuccess }: RegisterScreenProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    role: 'USER' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Initialization Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col font-mono">
      <header className="bg-white border-b-4 border-black p-6 flex justify-between items-center neo-shadow">
        <div className="flex items-center gap-4">
          <Shield size={32} className="text-[#695f00]" fill="#ffe800" />
          <h1 className="text-2xl font-black italic uppercase">AUTH//CORE</h1>
        </div>
        <div className="text-2xl font-black italic opacity-30">[NEW_USER]</div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
        >
          <Card className="space-y-8 bg-white p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                label="ID (USERNAME)" 
                placeholder="Enter username..." 
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <Input 
                label="COMMS (EMAIL)" 
                type="email"
                placeholder="Enter email..." 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input 
                label="KEY (PASSWORD)" 
                type="password"
                placeholder="Enter password..." 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wider">CLASS</label>
                <select 
                  className="w-full p-4 bg-white border-4 border-black font-mono neo-shadow-sm focus:bg-[#ffe800] outline-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              {error && (
                <div className="bg-[#FF3366] text-white p-4 border-4 border-black font-bold">
                  FAILURE :: {error.toUpperCase()}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={onBack}
                >
                  ABORT
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#00daf3] hover:bg-[#00daf3]/90"
                  disabled={loading}
                >
                  {loading ? 'INITIALIZING...' : 'INITIALIZE'}
                  <UserPlus />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
