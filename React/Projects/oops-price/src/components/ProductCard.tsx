import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatCurrency } from '../services/productService';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Percentage Discount Badge */}
      <div className="absolute top-4 left-4 z-10 bg-primary text-black text-[10px] font-black uppercase px-2 py-1 tracking-widest">
        -{Math.round(product.discountPercentage)}%
      </div>

      {/* Thumbnail Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
        <motion.img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View Details <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-2">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            {product.brand}
          </p>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1 mb-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-4">
          {product.category}
        </p>

        <div className="mt-auto flex items-end gap-3">
          <span className="text-lg font-black text-white">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-text-muted line-through mb-1 opacity-50">
            {formatCurrency(Math.round(product.price / (1 - product.discountPercentage / 100)))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
