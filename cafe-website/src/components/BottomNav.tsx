import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" strokeWidth={1.8}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" />
        <path d="M9 21V12h6v9" stroke="currentColor" />
      </svg>
    ),
  },
  {
    path: "/menu",
    label: "Menu",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    path: "/favorites",
    label: "Favorites",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" strokeWidth={1.8}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-100 px-2 pb-safe md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-3 px-6 transition-all duration-200 ${isActive ? "text-amber-700" : "text-stone-400"}`}
              >
                <span className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "text-amber-700" : "text-stone-400"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop top nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 px-8 h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <span className="font-bold text-stone-800 text-lg tracking-tight">
            Patrick <span className="text-amber-600">haus</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-amber-50 text-amber-700" : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}