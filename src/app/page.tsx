import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-sm uppercase tracking-wider text-orange-600">
          Practical Test
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Meal Explorer dengan Next.js
        </h1>
        <p className="mt-4 text-slate-600">
          Jelajahi daftar ingredients, lihat meal berdasarkan ingredient, dan
          buka detail recipe lengkap.
        </p>
        <Link
          href="/ingredients"
          className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Buka Halaman Ingredients
        </Link>
      </section>
    </main>
  );
}
