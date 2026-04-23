# Meal Explorer - Practical Test

Aplikasi web berbasis **Next.js** untuk eksplorasi data makanan dari [TheMealDB](https://www.themealdb.com/), mencakup:
- daftar ingredients,
- daftar meal berdasarkan ingredient,
- dan detail meal (bonus).

Project ini dibuat untuk memenuhi kebutuhan practical test frontend dengan fokus pada:
- dynamic routing,
- search di sisi frontend,
- atomic component (atom, molecule, organism),
- UI modern dan responsive.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Library**: React, TypeScript
- **Styling**: Tailwind CSS
- **API Source**: TheMealDB

## Fitur Utama

### 1) Halaman Ingredients (`/ingredients`)
- Menampilkan list ingredients dari endpoint:
  - `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Search ingredient by name (frontend).
- Pagination (6 item per halaman).
- Setiap ingredient memiliki gambar dan deskripsi singkat.
- Klik item ingredient akan menuju halaman detail ingredient.

### 2) Halaman Ingredients Detail (`/ingredients/[ingredientName]`)
- Parameter: `ingredientName`
- Menampilkan list meal berdasarkan ingredient terpilih dari endpoint:
  - `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`
- Search meal by name (frontend).
- Klik meal akan menuju halaman detail meal.

### 3) Halaman Meals Detail (`/meals/[mealId]`) - Bonus
- Parameter: `mealId`
- Menampilkan detail meal dari endpoint:
  - `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`
- Menampilkan:
  - gambar meal,
  - nama/judul meal,
  - tutorial/instructions,
  - list recipe (ingredient + takaran),
  - YouTube embedded (jika tersedia).

## Struktur Komponen (Atomic)

- `src/components/atoms`
  - `SearchInput.tsx`
- `src/components/molecules`
  - `IngredientList.tsx`
  - `MealList.tsx`
- `src/components/organisms`
  - `MealAppHeader.tsx`

## Menjalankan Project di Lokal

### Prasyarat
- Node.js 18+ (disarankan versi terbaru LTS)
- npm

### Install dependency
```bash
npm install
```

### Jalankan mode development
```bash
npm run dev
```

Buka browser ke:
- [http://localhost:3000](http://localhost:3000)

### Lint
```bash
npm run lint
```

### Build production
```bash
npm run build
```

### Jalankan build production
```bash
npm run start
```

## Catatan Konfigurasi

- `next.config.ts` sudah mengizinkan remote image dari `www.themealdb.com`.
- Indicator Next.js pada mode development sudah dimatikan (`devIndicators: false`).

## Deploy ke Vercel

### Cara cepat (via dashboard)
1. Push project ke GitHub.
2. Login ke [Vercel](https://vercel.com/).
3. Klik **Add New Project**.
4. Import repository.
5. Build setting default Next.js (tanpa konfigurasi khusus tambahan).
6. Klik **Deploy**.

### Cara via CLI (opsional)
```bash
npm i -g vercel
vercel
```

Ikuti instruksi sampai deploy selesai.

## Endpoint API yang Digunakan

- List Ingredients  
  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`

- Filter by Ingredient  
  `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`

- Detail Meal  
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`
