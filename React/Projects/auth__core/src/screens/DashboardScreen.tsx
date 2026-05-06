import React from 'react';
import { Shield, Fingerprint, Satellite, Terminal, LogOut, Edit, Activity, Cpu } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export function DashboardScreen() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col font-mono pb-24">
      <header className="bg-white border-b-4 border-black p-6 flex justify-between items-center neo-shadow sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Shield size={32} className="text-[#695f00]" fill="#ffe800" />
          <h1 className="text-2xl font-black italic uppercase">AUTH//CORE</h1>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="px-4 py-2 border-4 border-black bg-[#ffe800] font-bold text-sm neo-shadow-sm">
            USER_KEY_ACTIVE
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full p-6 space-y-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white relative overflow-hidden">
            <div className="w-24 h-24 hazard-stripe border-4 border-black flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <h1 className="text-3xl font-black uppercase tracking-tighter">
                {user?.username?.toUpperCase() || 'USER_OP_774'}
              </h1>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase">{user?.role || 'SYS_USER'}</span>
                <span className="px-3 py-1 bg-[#00daf3] border-2 border-black text-xs font-bold uppercase">LCL_SECURE</span>
              </div>
            </div>
            <Button variant="secondary" className="bg-[#ffe800]">
              <Edit size={16} />
              [ EDIT_PARAMS ]
            </Button>
          </Card>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="h-full space-y-4">
              <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <h3 className="text-xl font-black uppercase">_ID</h3>
                <Fingerprint size={24} />
              </div>
              <div className="space-y-3 text-sm font-bold opacity-70">
                <div className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>PRN:</span> <span className="text-black">UID-{user?._id?.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>LOC:</span> <span className="text-black">SECTOR_RUN_V1</span>
                </div>
                <div className="flex justify-between">
                  <span>STS:</span> <span className="text-[#006875]">ACTIVE</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full space-y-4">
              <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <h3 className="text-xl font-black uppercase">_COMMS</h3>
                <Satellite size={24} />
              </div>
              <div className="space-y-3 text-sm font-bold opacity-70">
                <div className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>ADDR:</span> <span className="text-black">{user?.email}</span>
                </div>
                <div className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>ENC:</span> <span className="text-black">AES-512_HYPER</span>
                </div>
                <div className="flex justify-between">
                  <span>PING:</span> <span className="text-[#FF3366]">09ms</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="space-y-4">
             <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <h3 className="text-xl font-black uppercase">SYS_DIAGNOSTICS</h3>
              </div>
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>CORE_STABILITY</span>
                    <span>94%</span>
                  </div>
                  <div className="h-8 w-full border-4 border-black bg-[#dadada] p-1">
                    <div className="h-full w-[94%] bg-black relative">
                      <div className="absolute inset-0 hazard-stripe opacity-20" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>AUTH_INTEGRITY</span>
                    <span>100%</span>
                  </div>
                  <div className="h-8 w-full border-4 border-black bg-[#dadada] p-1">
                    <div className="h-full w-full bg-[#00daf3]" />
                  </div>
                </div>
              </div>
          </Card>
        </motion.section>

        <div className="pt-8">
          <Button 
            variant="danger" 
            size="lg" 
            className="w-full text-2xl h-24"
            onClick={logout}
          >
            [ TERMINATE_SESSION ]
          </Button>
        </div>
      </main>
    </div>
  );
}
