import { useNavigate } from "react-router-dom";
import { coffeeData } from "../data/coffeeData";
import { useFavorites } from "../hooks/userFavorites";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoritedCoffees = coffeeData.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen pb-10" style={{ background: "#0a0703", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes zoomIn { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
        .fav-card { animation: zoomIn .4s cubic-bezier(.34,1.2,.64,1) both; transition: transform .3s cubic-bezier(.34,1.4,.64,1), box-shadow .3s ease; }
        .fav-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
        .fav-img { transition: transform .5s cubic-bezier(.25,1,.5,1); }
        .fav-card:hover .fav-img { transform: scale(1.06); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header — scrolls with page */}
      <div className="px-4 pt-16 pb-5 md:px-8 md:pt-8">
        <div style={{ animation: "fadeUp .45s ease .04s both" }}>
          <p className="text-[10px] tracking-[.22em] uppercase font-semibold mb-1" style={{ color: "#57534e" }}>
            Your Collection
          </p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,6vw,2.8rem)", color: "white", lineHeight: 1 }}>
            My <span style={{ color: "#f59e0b" }}>Favorites</span>
          </h1>
          {favoritedCoffees.length > 0 && (
            <p className="text-sm mt-2" style={{ color: "#57534e" }}>
              {favoritedCoffees.length} drink{favoritedCoffees.length !== 1 ? "s" : ""} saved
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 max-w-2xl mx-auto md:max-w-5xl">
        {favoritedCoffees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center" style={{ animation: "fadeUp .5s ease both" }}>
            <div
              className="flex items-center justify-center mb-5"
              style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}
            >
              <svg viewBox="0 0 24 24" style={{ width: "28px", height: "28px" }} fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth={1.5}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: "white", fontSize: "1.2rem", marginBottom: "8px" }}>
              No favorites yet
            </h3>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#57534e" }}>
              Tap the heart on any drink to save it here for quick access.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 font-semibold text-sm px-6 py-3 rounded-2xl"
              style={{
                background: "#f59e0b",
                color: "white",
                boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {favoritedCoffees.map((coffee, i) => (
                <div
                  key={coffee.id}
                  className="fav-card rounded-3xl overflow-hidden"
                  style={{
                    animationDelay: `${i * 0.07}s`,
                    background: "#1a1107",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <img src={coffee.image} alt={coffee.name} className="fav-img w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1a1107 0%, transparent 50%)" }} />

                    {/* Remove heart */}
                    <button
                      onClick={() => toggleFavorite(coffee.id)}
                      className="absolute top-3 right-3 flex items-center justify-center"
                      style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        background: "rgba(245,158,11,0.15)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        transition: "all .25s cubic-bezier(.34,1.56,.64,1)",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.3)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,158,11,0.15)"; }}
                    >
                      <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px" }} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5}>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm leading-tight" style={{ color: "white", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                      {coffee.name}
                    </h3>
                    <p className="text-[11px] leading-relaxed mt-1" style={{ color: "#57534e", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {coffee.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(245,158,11,0.5)" }}>Price</p>
                        <p style={{ fontFamily: "'Syne', sans-serif", color: "#f59e0b", fontSize: "1.1rem", lineHeight: 1 }}>
                          ₱{coffee.price}
                        </p>
                      </div>
                      <div className="h-0.5 w-6 rounded-full" style={{ background: "#f59e0b", opacity: 0.4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear all */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => { if (window.confirm("Remove all favorites?")) favorites.forEach((id: string) => toggleFavorite(id)); }}
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full"
                style={{
                  color: "#78716c",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.04)",
                  transition: "color .2s, border-color .2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#78716c"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
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