type MealAppHeaderProps = {
  subtitle: string;
};

export default function MealAppHeader({ subtitle }: MealAppHeaderProps) {
  return (
    <header className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-[1px] shadow-sm">
      <div className="rounded-2xl bg-white p-5 text-center sm:p-6">
        <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-500 text-sm font-extrabold text-white shadow-sm">
            MA
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              MealApp
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
