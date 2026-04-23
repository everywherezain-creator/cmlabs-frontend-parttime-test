const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
};

export type MealSummary = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string | null;
  [key: string]: string | null;
};

async function fetchMealDb<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil data dari MealDB: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const data = await fetchMealDb<{ meals: Ingredient[] }>("list.php?i=list");
  return data.meals ?? [];
}

export async function getMealsByIngredient(
  ingredientName: string,
): Promise<MealSummary[]> {
  const data = await fetchMealDb<{ meals: MealSummary[] | null }>(
    `filter.php?i=${encodeURIComponent(ingredientName)}`,
  );
  return data.meals ?? [];
}

export async function getMealDetail(mealId: string): Promise<MealDetail | null> {
  const data = await fetchMealDb<{ meals: MealDetail[] | null }>(
    `lookup.php?i=${encodeURIComponent(mealId)}`,
  );
  return data.meals?.[0] ?? null;
}

export function parseRecipeItems(meal: MealDetail): string[] {
  const items: string[] = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      items.push(`${measure ? `${measure} ` : ""}${ingredient}`.trim());
    }
  }

  return items;
}
