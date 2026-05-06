export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: any;
}

export type RecipeSummary = Pick<Recipe, 'idMeal' | 'strMeal' | 'strCategory' | 'strArea' | 'strMealThumb'>;
