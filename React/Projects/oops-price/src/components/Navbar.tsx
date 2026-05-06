import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 h-20 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-4">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm group-hover:scale-105 transition-transform">
            <ShoppingBag className="text-black" size={24} />
          </div>
          <div>
            <h1 className="font-sans font-black text-xl text-white uppercase tracking-tighter leading-none">
              OOPS <span className="text-primary">PRICE</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold mt-1">
              Created by Divyaraj Gurjar
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
        <button className="hover:text-primary transition-colors">Men</button>
        <button className="hover:text-primary transition-colors">Women</button>
        <button className="hover:text-primary transition-colors">Accessories</button>
        <button className="hover:text-white transition-colors border-l border-white/10 pl-8">Account</button>
      </div>
    </header>
  );
}
