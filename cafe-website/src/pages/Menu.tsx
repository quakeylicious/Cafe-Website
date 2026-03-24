import { useState } from "react";
import { coffeeData, categories } from "../data/coffeeData";
import { useFavorites } from "../hooks/userFavorites";
import CoffeeCard from "../components/CoffeeCard";
import type { CoffeeCategory } from "../types";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory>("All");
  const [search, setSearch] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = coffeeData.filter((coffee) => {
    const matchCategory = activeCategory === "All" || coffee.category === activeCategory;
    const matchSearch =
      search === "" ||
      coffee.name.toLowerCase().includes(search.toLowerCase()) ||
      coffee.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-amber-50 pb-24 md:pb-8 md:pt-16">
      <div className="bg-white border-b border-stone-100 px-4 pt-6 pb-4 md:px-8">
        <div className="max-w-2xl mx-auto md:max-w-4xl">
          <h1 className="text-stone-800 font-bold text-2xl mb-1">Our Menu</h1>
          <p className="text-stone-400 text-sm mb-4">{coffeeData.length} drinks crafted for you</p>

          {/* Search */}
          <div className="relative mb-4">
            <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search drinks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as CoffeeCategory)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-white text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 md:px-8 max-w-2xl mx-auto md:max-w-4xl">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-4">☕</span>
            <h3 className="text-stone-600 font-semibold">Nothing found</h3>
            <p className="text-stone-400 text-sm mt-1">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-amber-600 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-xs mb-4">
              {filtered.length} drink{filtered.length !== 1 ? "s" : ""}{" "}
              {activeCategory !== "All" ? `in ${activeCategory}` : "available"}
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {filtered.map((coffee) => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  isFavorite={isFavorite(coffee.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}