import { useEffect, useState } from 'react';
import React from 'react';
import { getJapaneseRecipes, searchRecipes } from '../services/api';
import { RecipeSummary } from '../types';
import RecipeCard from '../components/RecipeCard';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  const fetchInitialRecipes = async () => {
    setLoading(true);
    const data = await getJapaneseRecipes();
    setRecipes(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) {
      fetchInitialRecipes();
      return;
    }
    setLoading(true);
    const data = await searchRecipes(searchTerm);
    setRecipes(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-8 md:px-16 container mx-auto">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <form onSubmit={handleSearch} className="relative group mb-12">
          <input
            type="text"
            placeholder="Search for your favorite meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-6 pr-14 rounded-full bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all placeholder:text-gray-300"
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 group-focus-within:text-brand-accent transition-colors"
          >
            <Search size={22} />
          </button>
        </form>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-light text-brand-dark tracking-wide mb-2"
        >
          YFL Recipe Gallery
        </motion.h1>
        <div className="w-24 h-px bg-brand-accent/30 mx-auto" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-brand-accent" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {recipes.map((recipe, index) => (
            <div key={recipe.idMeal}>
              <RecipeCard recipe={recipe} index={index} />
            </div>
          ))}
          {recipes.length === 0 && (
            <div className="col-span-full text-center py-24 text-gray-400 font-serif text-2xl italic">
              No recipes found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
