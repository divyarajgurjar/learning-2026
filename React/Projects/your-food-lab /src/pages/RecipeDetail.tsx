import { useEffect, useState } from 'react';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRecipeDetail, getJapaneseRecipes } from '../services/api';
import { Recipe, RecipeSummary } from '../types';
import { Loader2, Play, Users, Clock, ChevronLeft, ChevronRight, Flame, Scale, Timer } from 'lucide-react';
import { motion } from 'motion/react';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recommended, setRecommended] = useState<RecipeSummary[]>([]);
  const [allRecipes, setAllRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

  const fetchDetail = async (recipeId: string) => {
    setLoading(true);
    const [detail, recs] = await Promise.all([
      getRecipeDetail(recipeId),
      getJapaneseRecipes()
    ]);
    
    setRecipe(detail);
    setAllRecipes(recs);
    setRecommended(recs.filter(r => r.idMeal !== recipeId).slice(0, 3));
    setLoading(false);
  };

  const getNextPrev = () => {
    const currentIndex = allRecipes.findIndex(r => r.idMeal === id);
    if (currentIndex === -1) return { next: null, prev: null };
    
    const prev = allRecipes[currentIndex - 1] || null;
    const next = allRecipes[currentIndex + 1] || null;
    return { next, prev };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-accent" size={40} />
      </div>
    );
  }

  if (!recipe) return <div>Recipe not found</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const youtubeId = recipe.strYoutube?.split('v=')[1];
  const { next, prev } = getNextPrev();

  return (
    <div className="min-h-screen bg-brand-cream/50 container mx-auto px-8 md:px-16 pt-8 pb-24">
      <div className="flex justify-between items-center mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-accent transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to Gallery</span>
        </Link>

        <div className="flex gap-4">
          {prev && (
            <button 
              onClick={() => navigate(`/recipe/${prev.idMeal}`)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:border-brand-accent hover:text-brand-accent transition-all text-sm uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> Prev Dish
            </button>
          )}
          {next && (
            <button 
              onClick={() => navigate(`/recipe/${next.idMeal}`)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:border-brand-accent hover:text-brand-accent transition-all text-sm uppercase tracking-widest"
            >
              Next Dish <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left Col: Media & Meta */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group bg-black">
             {youtubeId ? (
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
             ) : (
                <img 
                  src={recipe.strMealThumb} 
                  alt={recipe.strMeal} 
                  className="w-full h-full object-cover"
                />
             )}
          </div>

          {/* New Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
              <Timer className="mx-auto mb-2 text-brand-accent" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Prep Time</p>
              <p className="font-serif text-lg">15 Mins</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
              <Clock className="mx-auto mb-2 text-brand-accent" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Cook Time</p>
              <p className="font-serif text-lg">25 Mins</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
              <Flame className="mx-auto mb-2 text-brand-accent" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Calories</p>
              <p className="font-serif text-lg">450 Kcal</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-gray-100">
              <Users className="mx-auto mb-2 text-brand-accent" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Servings</p>
              <p className="font-serif text-lg">2 Persons</p>
            </div>
          </div>

          <div className="hidden lg:block pt-8">
             <h2 className="text-3xl font-serif mb-8 italic text-gray-400">You Might Also Like</h2>
             <div className="grid grid-cols-2 gap-8">
                {recommended.slice(0, 2).map((r, i) => (
                  <div key={r.idMeal}>
                    <RecipeCard recipe={r} index={i} />
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Right Col: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 text-brand-accent mb-2 uppercase tracking-[0.3em] text-[10px] font-bold">
              <span>{recipe.strCategory}</span>
              <span className="w-1 h-1 bg-brand-accent rounded-full" />
              <span>{recipe.strArea}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 leading-tight">
              {recipe.strMeal}
            </h1>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif">Ingredients</h3>
                <div className="h-px flex-grow bg-gray-200" />
                <span className="text-[10px] uppercase tracking-widest text-gray-400">{ingredients.length} Items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                {ingredients.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline group border-b border-gray-100/50 pb-2">
                    <span className="text-gray-600 group-hover:text-brand-accent transition-colors capitalize">{item.ingredient}</span>
                    <span className="text-brand-accent/60 font-serif italic text-base group-hover:text-brand-accent transition-all duration-300">
                      {item.measure}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif">Instructions</h3>
                <div className="h-px flex-grow bg-gray-200" />
              </div>
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {recipe.strInstructions.split(/Step \d+:|\r\n|\n/).filter(s => s.trim().length > 10).map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="flex flex-col items-center">
                      <span className="font-serif text-brand-accent/20 text-3xl group-hover:text-brand-accent transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="w-px h-full bg-gray-100 group-last:hidden mt-2" />
                    </div>
                    <p className="pt-1 font-light italic">{step.trim()}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
