import Link from "next/link";
import MealList from "@/components/molecules/MealList";
import MealAppHeader from "@/components/organisms/MealAppHeader";
import { getMealsByIngredient } from "@/lib/mealdb";

type IngredientDetailPageProps = {
  params: Promise<{ ingredientName: string }>;
};

export default async function IngredientDetailPage({
  params,
}: IngredientDetailPageProps) {
  const { ingredientName } = await params;
  const decodedIngredient = decodeURIComponent(ingredientName);
  const meals = await getMealsByIngredient(decodedIngredient);

  return (
    <main className="content-page-bg mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <MealAppHeader subtitle="Daftar meal berdasarkan ingredient pilihanmu." />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-wide text-orange-600">
            Ingredients Detail
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {decodedIngredient}
          </h1>
          <p className="mt-2 text-slate-600">
            Pilih meal untuk melihat detail lengkap recipe.
          </p>
        </div>
        <Link
          href="/ingredients"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Kembali ke Ingredients
        </Link>
      </div>

      {meals.length > 0 ? (
        <MealList meals={meals} />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
          Tidak ada meal ditemukan untuk ingredient ini.
        </div>
      )}
    </main>
  );
}
