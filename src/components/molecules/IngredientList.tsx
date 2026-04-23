"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SearchInput from "@/components/atoms/SearchInput";
import type { Ingredient } from "@/lib/mealdb";

type IngredientListProps = {
  ingredients: Ingredient[];
};

const ITEMS_PER_PAGE = 6;

export default function IngredientList({ ingredients }: IngredientListProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const filteredIngredients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return ingredients;

    return ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(normalized),
    );
  }, [ingredients, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE),
  );

  const currentPage = Math.min(page, totalPages);

  const pagedIngredients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIngredients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredIngredients, currentPage]);

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchInput
          value={query}
          onChange={handleSearchChange}
          placeholder="Cari ingredient berdasarkan nama..."
        />
        <p className="mt-3 text-sm text-slate-600">
          Menampilkan <strong>{filteredIngredients.length}</strong> dari{" "}
          <strong>{ingredients.length}</strong> ingredients.
        </p>
      </div>

      {filteredIngredients.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pagedIngredients.map((ingredient) => (
              <Link
                key={ingredient.idIngredient}
                href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow"
              >
                <div className="relative h-36 w-full bg-slate-100">
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                      ingredient.strIngredient,
                    )}.png`}
                    alt={ingredient.strIngredient}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {ingredient.strIngredient}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {ingredient.strDescription || "Tidak ada deskripsi ingredient."}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <span className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-slate-800">Ingredient tidak ditemukan.</p>
          <p className="mt-1 text-sm text-slate-600">
            Coba kata kunci lain pada kolom pencarian.
          </p>
        </div>
      )}
    </section>
  );
}
