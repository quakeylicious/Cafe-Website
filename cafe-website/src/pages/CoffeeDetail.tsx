import { useParams, useNavigate } from "react-router-dom";
import { coffeeData } from "../data/coffeeData";
import { useFavorites } from "../hooks/userFavorites";

export default function CoffeeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const coffee = coffeeData.find((c) => c.id === id);

  if (!coffee) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center gap-4">
        <span className="text-5xl">☕</span>
        <h2 className="text-stone-700 font-semibold">Coffee not found</h2>
        <button onClick={() => navigate("/menu")} className="text-amber-600 font-medium text-sm">← Back to Menu</button>
      </div>
    );
  }

  const favorited = isFavorite(coffee.id);
  const related = coffeeData.filter((c) => c.category === coffee.category && c.id !== coffee.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-amber-50 pb-28 md:pb-8 md:pt-16">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-stone-100 md:top-20"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-amber-50 via-transparent to-transparent" />
      </div>

      <div className="px-4 -mt-8 relative md:px-8 max-w-lg mx-auto md:max-w-2xl">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              {coffee.category}
            </span>
            <button
              onClick={() => toggleFavorite(coffee.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                favorited ? "bg-red-50 border border-red-100" : "bg-stone-50 border border-stone-100"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-5 h-5 transition-all duration-300 ${favorited ? "fill-red-400 stroke-red-400 scale-110" : "fill-none stroke-stone-400"}`}
                strokeWidth={2}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <h1 className="text-stone-800 text-2xl font-bold leading-tight mb-1">{coffee.name}</h1>
          <p className="text-amber-700 font-bold text-xl mb-4">₱{coffee.price}</p>
          <p className="text-stone-500 text-sm leading-relaxed mb-4">{coffee.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {coffee.tags.map((tag) => (
              <span key={tag} className="text-xs bg-stone-50 text-stone-500 border border-stone-200 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <div className={`flex items-center gap-2 text-xs font-medium ${coffee.isAvailable ? "text-emerald-600" : "text-stone-400"}`}>
            <span className={`w-2 h-2 rounded-full ${coffee.isAvailable ? "bg-emerald-500" : "bg-stone-300"}`} />
            {coffee.isAvailable ? "Available now" : "Currently unavailable"}
          </div>
        </div>

        <button
          onClick={() => toggleFavorite(coffee.id)}
          className={`w-full mt-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
            favorited ? "bg-red-400 text-white shadow-lg shadow-red-400/30" : "bg-stone-800 text-white shadow-lg shadow-stone-800/20"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={favorited ? "white" : "none"} stroke="white" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {favorited ? "Saved to Favorites" : "Add to Favorites"}
        </button>

        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="text-stone-700 font-bold text-base mb-3">More {coffee.category}</h3>
            <div className="flex flex-col gap-3">
              {related.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-stone-100 cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => navigate(`/menu/${c.id}`)}
                >
                  <img src={c.image} alt={c.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-stone-800 font-semibold text-sm">{c.name}</p>
                    <p className="text-stone-400 text-xs line-clamp-1 mt-0.5">{c.description}</p>
                    <p className="text-amber-600 font-bold text-sm mt-1">₱{c.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}