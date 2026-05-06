import { RecipeSummary } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RecipeCardProps {
  recipe: RecipeSummary;
  index: number;
}

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden recipe-card-shadow flex flex-col h-full hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-medium text-gray-800 line-clamp-1 mb-2">
          {recipe.strMeal}
        </h3>
        <div className="flex flex-col gap-1 text-sm text-gray-500 mb-6">
          <p>Category: <span className="text-gray-700">{recipe.strCategory || 'Japanese'}</span></p>
          <p>Area: <span className="text-gray-700">{recipe.strArea || 'Traditional'}</span></p>
        </div>

        <Link 
          to={`/recipe/${recipe.idMeal}`}
          className="mt-auto block w-full py-3 bg-brand-accent text-white text-center font-medium rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest text-xs"
        >
          View Recipe
        </Link>
      </div>
    </motion.div>
  );
}
