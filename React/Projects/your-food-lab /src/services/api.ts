import { Recipe, RecipeSummary } from '../types';

const API_BASE = 'https://api.freeapi.app/api/v1/public/meals';

export async function getJapaneseRecipes(): Promise<RecipeSummary[]> {
  const response = await fetch(`${API_BASE}?limit=10`);
  const data = await response.json();
  console.log(data)
  // The filter API only returns id, name, and thumb. We need full details for category/area in the gallery
  // But for performance, let's just use the filter results and maybe mock category/area or fetch a few
  return data.data.data || [];
}

export async function getRecipeDetail(id: string): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  console.log(query)
  const response = await fetch(`${API_BASE}?limit=10&query=${query}`);
  const data = await response.json();
  return data.meals || [];
}
