import Image from "next/image";
import Link from "next/link";
import MealAppHeader from "@/components/organisms/MealAppHeader";
import { getMealDetail, parseRecipeItems } from "@/lib/mealdb";

type MealDetailPageProps = {
  params: Promise<{ mealId: string }>;
};

function toEmbedYoutube(url: string | null): string | null {
  if (!url) return null;
  const id = url.split("v=")[1]?.split("&")[0];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export default async function MealDetailPage({ params }: MealDetailPageProps) {
  const { mealId } = await params;
  const meal = await getMealDetail(mealId);

  if (!meal) {
    return (
      <main className="content-page-bg mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <MealAppHeader subtitle="Detail meal dan recipe lengkap." />
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
          Meal tidak ditemukan.
        </div>
      </main>
    );
  }

  const recipeItems = parseRecipeItems(meal);
  const youtubeEmbedUrl = toEmbedYoutube(meal.strYoutube);

  return (
    <main className="content-page-bg mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <MealAppHeader subtitle="Lihat tutorial, bahan, dan video memasak." />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          {meal.strMeal}
        </h1>
        <Link
          href="/ingredients"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Kembali ke Ingredients
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
          <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Tutorial</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
              {meal.strInstructions}
            </p>
          </div>
        </article>

        <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recipe</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
              {recipeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {youtubeEmbedUrl ? (
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Video Tutorial
              </h2>
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={youtubeEmbedUrl}
                  title={`Video tutorial ${meal.strMeal}`}
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
