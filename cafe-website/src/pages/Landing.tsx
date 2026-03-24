import { useNavigate } from "react-router-dom";
import { coffeeData } from "../data/coffeeData";
import { useFavorites } from "../hooks/userFavorites";
import CoffeeCard from "../components/CoffeeCard";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoritedCoffees = coffeeData.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen bg-amber-50 pb-24 md:pb-8 md:pt-16">
      <div className="bg-white border-b border-stone-100 px-4 pt-6 pb-5 md:px-8">
        <div className="max-w-2xl mx-auto md:max-w-4xl">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-400 stroke-red-400" strokeWidth={1.5}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h1 className="text-stone-800 font-bold text-2xl">Favorites</h1>
          </div>
          <p className="text-stone-400 text-sm">
            {favoritedCoffees.length > 0
              ? `${favoritedCoffees.length} drink${favoritedCoffees.length !== 1 ? "s" : ""} saved`
              : "Your saved drinks will appear here"}
          </p>
        </div>
      </div>

      <div className="px-4 pt-5 md:px-8 max-w-2xl mx-auto md:max-w-4xl">
        {favoritedCoffees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-stone-100 mb-5">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-none stroke-stone-300" strokeWidth={1.5}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="text-stone-600 font-semibold text-lg mb-2">No favorites yet</h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Tap the heart icon on any drink to save it here for quick access.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="mt-6 bg-amber-600 text-white font-semibold px-6 py-3 rounded-2xl text-sm active:scale-95 transition-transform shadow-lg shadow-amber-600/20"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {favoritedCoffees.map((coffee) => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  isFavorite={isFavorite(coffee.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  if (window.confirm("Remove all favorites?"))
                    favorites.forEach((id: string) => toggleFavorite(id));
                }}
                className="text-stone-400 text-sm font-medium hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
                Clear all favorites
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}