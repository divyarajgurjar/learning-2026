import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatCurrency } from '../services/productService';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-[#0d0d0d] border border-white/10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-text-muted hover:text-white transition-colors bg-white/5 p-2 backdrop-blur-md rounded-full"
          >
            <X size={24} />
          </button>

          {/* Left: Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <div className="aspect-square bg-white/5 overflow-hidden">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[activeImage] || product.thumbnail} 
                alt={product.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square border-2 transition-all overflow-hidden ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-6 md:p-12 md:pl-0 flex flex-col overflow-y-auto custom-scrollbar bg-black/20">
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-xs font-black text-primary uppercase tracking-[0.3em] font-sans">
                {product.brand}
              </p>
              <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-white/20">|</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-white">
                {formatCurrency(product.price)}
              </span>
              <span className="text-lg text-text-muted line-through opacity-40">
                {formatCurrency(Math.round(product.price / (1 - product.discountPercentage / 100)))}
              </span>
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-1 tracking-widest ring-1 ring-primary/20">
                Save {Math.round(product.discountPercentage)}%
              </span>
            </div>

            <div className="mb-10">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">Description</h3>
              <p className="text-sm text-text-muted leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pb-10 border-b border-white/5">
              <div className="flex flex-col gap-2">
                <Truck size={20} className="text-primary" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Fast Delivery</span>
              </div>
              <div className="flex flex-col gap-2">
                <RefreshCcw size={20} className="text-primary" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">30 Day Returns</span>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Secure Warranty</span>
              </div>
            </div>

            <button className="w-full bg-primary text-black py-5 text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-colors">
              <ShoppingCart size={20} />
              Add to Collection
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
