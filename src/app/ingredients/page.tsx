import Link from "next/link";
import MealAppHeader from "@/components/organisms/MealAppHeader";
import IngredientList from "@/components/molecules/IngredientList";
import { getIngredients } from "@/lib/mealdb";

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

  return (
    <main className="content-page-bg mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <MealAppHeader subtitle="Eksplorasi ingredient untuk menemukan ide masakan." />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Ingredients
          </h1>
          <p className="mt-2 text-slate-600">
            Pilih ingredient untuk melihat daftar meal terkait.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Kembali ke Beranda
        </Link>
      </div>

      <IngredientList ingredients={ingredients} />
    </main>
  );
}
