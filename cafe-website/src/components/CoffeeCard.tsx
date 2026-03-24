import { useNavigate } from "react-router-dom";
import type { Coffee } from "../types";

interface CoffeeCardProps {
  coffee: Coffee;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  variant?: "default" | "compact";
}

export default function CoffeeCard({
  coffee,
  isFavorite,
  onToggleFavorite,
  variant = "default",
}: CoffeeCardProps) {
  const navigate = useNavigate();

  if (variant === "compact") {
    return (
      <div
        className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-stone-100 cursor-pointer active:scale-[0.98] transition-transform"
        onClick={() => navigate(`/menu/${coffee.id}`)}
      >
        <img
          src={coffee.image}
          alt={coffee.name}
          className="w-20 h-20 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <span className="text-[10px] font-medium text-amber-600 uppercase tracking-widest">
              {coffee.category}
            </span>
            <h3 className="text-stone-800 font-semibold text-sm leading-tight mt-0.5 truncate">
              {coffee.name}
            </h3>
            <p className="text-stone-400 text-xs mt-1 line-clamp-2 leading-relaxed">
              {coffee.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-amber-700 font-bold text-sm">₱{coffee.price}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(coffee.id); }}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-200 ${isFavorite ? "fill-red-400 stroke-red-400" : "fill-none stroke-stone-300"}`} strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/menu/${coffee.id}`)}
    >
      <div className="relative">
        <img src={coffee.image} alt={coffee.name} className="w-full h-40 object-cover" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(coffee.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 ${isFavorite ? "bg-white" : "bg-white/80 backdrop-blur-sm"}`}
        >
          <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-200 ${isFavorite ? "fill-red-400 stroke-red-400" : "fill-none stroke-stone-400"}`} strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {!coffee.isAvailable && (
          <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
            <span className="bg-stone-800 text-white text-xs font-medium px-3 py-1 rounded-full">Unavailable</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <span className="text-[10px] font-medium text-amber-600 uppercase tracking-widest">{coffee.category}</span>
        <h3 className="text-stone-800 font-semibold text-sm mt-0.5 leading-tight">{coffee.name}</h3>
        <p className="text-stone-400 text-xs mt-1 line-clamp-2 leading-relaxed">{coffee.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-amber-700 font-bold text-sm">₱{coffee.price}</span>
          <div className="flex gap-1">
            {coffee.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[9px] bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}