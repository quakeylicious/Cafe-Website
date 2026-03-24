import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingHeart() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isFavoritesPage = location.pathname === "/favorites";

  if (isAdminPage) return null;

  return (
    <div
      className="absolute z-50 flex items-center justify-between px-4 pt-4 w-full md:hidden"
      style={{ top: 0, left: 0 }}
    >
      {/* Cafe name */}
      <span className="f-display font-bold text-white text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
        Brew<span style={{ color: "#f59e0b" }}>haus</span>
      </span>

      {/* Heart button */}
      <button
        onClick={() => navigate(isFavoritesPage ? "/" : "/favorites")}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: isFavoritesPage ? "#f59e0b" : "rgba(255,255,255,0.10)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${isFavoritesPage ? "#f59e0b" : "rgba(255,255,255,0.15)"}`,
          boxShadow: isFavoritesPage
            ? "0 0 20px rgba(245,158,11,0.5)"
            : "0 4px 16px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: "18px", height: "18px", transition: "all 0.3s ease" }}
          fill={isFavoritesPage ? "white" : "none"}
          stroke={isFavoritesPage ? "white" : "rgba(255,255,255,0.8)"}
          strokeWidth={2}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}