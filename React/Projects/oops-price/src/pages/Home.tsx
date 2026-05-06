import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(page, 15);
        if (data && data.data) {
          setProducts(data.data);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="flex-grow p-6 md:p-12 max-w-[1800px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              Season <span className="text-primary">2026</span>
            </h2>
            <p className="text-text-muted text-sm uppercase tracking-[0.2em] font-bold">
              Exclusive Curations for the Modern Enthusiast
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-text-muted border border-white/10 px-4 py-2 hover:border-white transition-colors cursor-pointer">
              Filter by Category
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-muted border border-white/10 px-4 py-2 hover:border-white transition-colors cursor-pointer">
              Sort: Recently Added
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
            <div className="w-12 h-12 border-2 border-white/5 border-t-primary rounded-none animate-spin" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary animate-pulse">
              Syncing Inventory
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 gap-y-10">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Pagination Container */}
      <div className="sticky bottom-0 bg-black/90 backdrop-blur-md border-t border-white/5 p-6 md:px-12 flex items-center justify-between z-20">
        <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">
          Displaying <span className="text-white">{(page - 1) * 15 + 1}-{Math.min(page * 15, page * 15)}</span> of Infinite
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            disabled={page === 1}
            onClick={() => {
              setPage(p => p - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[11px] font-black text-text-muted hover:text-primary uppercase tracking-[0.3em] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
             <span className="text-[11px] font-black text-white px-2">0{page}</span>
             <span className="text-text-muted opacity-20">/</span>
             <span className="text-[11px] font-black text-text-muted px-2">0{totalPages}</span>
          </div>

          <button 
            disabled={page === totalPages}
            onClick={() => {
              setPage(p => p + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[11px] font-black text-white hover:text-primary uppercase tracking-[0.3em] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Next Showcase
          </button>
        </div>
      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
