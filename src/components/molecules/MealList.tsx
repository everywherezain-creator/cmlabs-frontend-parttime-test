"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SearchInput from "@/components/atoms/SearchInput";
import type { MealSummary } from "@/lib/mealdb";

type MealListProps = {
  meals: MealSummary[];
};

export default function MealList({ meals }: MealListProps) {
  const [query, setQuery] = useState("");

  const filteredMeals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return meals;

    return meals.filter((meal) => meal.strMeal.toLowerCase().includes(normalized));
  }, [meals, query]);

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Cari meal berdasarkan nama..."
        />

        <p className="mt-3 text-sm text-slate-600">
          Menampilkan <strong>{filteredMeals.length}</strong> dari{" "}
          <strong>{meals.length}</strong> meals.
        </p>
      </div>

      {filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/meals/${meal.idMeal}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold text-slate-900">
                  {meal.strMeal}
                </h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-orange-600">
                  Lihat detail recipe
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-slate-800">Meal tidak ditemukan.</p>
          <p className="mt-1 text-sm text-slate-600">
            Coba kata kunci lain pada kolom pencarian.
          </p>
        </div>
      )}
    </section>
  );
}
