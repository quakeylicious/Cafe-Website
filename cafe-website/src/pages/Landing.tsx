import { useState } from "react";
import { menuData } from "../data/menuData";
import type { Category, SubCategory, MenuItem } from "../data/menuData";

type View = "categories" | "subcategories" | "items";

export default function Landing() {
  const [view, setView] = useState<View>("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [visible, setVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const go = (fn: () => void, dir: "left" | "right") => {
    if (transitioning) return;
    setSlideDir(dir);
    setVisible(false);
    setTransitioning(true);
    setTimeout(() => { fn(); setVisible(true); setTransitioning(false); }, 280);
  };

  const openCategory = (cat: Category) =>
    go(() => {
      setSelectedCategory(cat);
      setSelectedSub(null);
      setView("subcategories");
      setSidebarOpen(false);
    }, "left");

  const openSub = (sub: SubCategory, cat?: Category) => {
    if (cat) setSelectedCategory(cat);
    setSelectedSub(sub);
    setView("items");
    setSidebarOpen(false);
  };

  const goBack = () => {
    if (view === "items") {
      go(() => { setView("subcategories"); setSelectedSub(null); }, "right");
    } else {
      go(() => { setView("categories"); setSelectedCategory(null); }, "right");
    }
  };

  const accents: Record<string, string> = {
    drinks: "#f59e0b", meals: "#ef4444",
    desserts: "#ec4899", snacks: "#eab308", combos: "#10b981",
  };

  const pageClass = !visible
    ? (slideDir === "left" ? "exit-left" : "exit-right")
    : (slideDir === "left" ? "enter-left" : "enter-right");

  const accent = selectedCategory ? (accents[selectedCategory.id] ?? "#f59e0b") : "#f59e0b";

  // ── Reusable full sidebar content ──
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Back to categories */}
      <button
        onClick={() => { onClose?.(); goBack(); }}
        className="back-btn flex items-center gap-2 px-5 py-4 text-sm font-medium shrink-0"
        style={{ color: accent, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <svg viewBox="0 0 24 24" className="back-arrow w-4 h-4" fill="none" stroke={accent} strokeWidth={2.5}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        All Categories
      </button>

      {/* Menu label */}
      <div className="px-5 pt-5 pb-1 shrink-0">
        <p className="f-display text-white text-base font-bold">Menu</p>
      </div>

      {/* All categories + their subcategories */}
      <div className="overflow-y-auto flex-1 pb-6">
        {menuData.map((cat) => {
          const catAcc = accents[cat.id] ?? "#f59e0b";
          const isCatActive = selectedCategory?.id === cat.id;
          return (
            <div key={cat.id} className="mt-4">
              {/* Category bold header */}
              <button
                onClick={() => { onClose?.(); openCategory(cat); }}
                className="w-full text-left px-5 py-1.5"
              >
                <p
                  className="f-display text-sm font-bold"
                  style={{ color: isCatActive ? "white" : "rgba(255,255,255,0.3)" }}
                >
                  {cat.name}
                </p>
              </button>

              {/* Subcategory links */}
              {cat.subcategories.map((sub) => {
                const isActive = selectedSub?.id === sub.id && isCatActive;
                return (
                  <button
                    key={sub.id}
                    onClick={() => { onClose?.(); openSub(sub, cat); }}
                    className="sidebar-link w-full text-left py-2 text-sm"
                    style={{
                      color: isActive ? catAcc : "rgba(255,255,255,0.45)",
                      background: isActive ? `${catAcc}12` : "transparent",
                      borderLeft: isActive ? `3px solid ${catAcc}` : "3px solid transparent",
                      paddingLeft: isActive ? "18px" : "20px",
                    }}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .f-display { font-family: 'Syne', sans-serif; }
        .f-body    { font-family: 'Outfit', sans-serif; }

        @keyframes enterLeft  { from { opacity:0; transform:translateX(48px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes enterRight { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
        @keyframes exitLeft   { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-48px); } }
        @keyframes exitRight  { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(48px);  } }
        @keyframes fadeUp     { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes zoomIn     { from { opacity:0; transform:scale(0.93); }     to { opacity:1; transform:scale(1);      } }
        @keyframes kenBurns   { from { transform:scale(1.0); } to { transform:scale(1.07); } }
        @keyframes glowPulse  { 0%,100% { opacity:.5; } 50% { opacity:1; } }
        @keyframes shimmerMove { 0% { transform:translateX(-100%) rotate(25deg); } 100% { transform:translateX(250%) rotate(25deg); } }
        @keyframes slideInDrawer { from { transform:translateX(-100%); } to { transform:translateX(0); } }
        @keyframes fadeInOverlay { from { opacity:0; } to { opacity:1; } }
        @keyframes modalPop { from { opacity:0; transform:scale(0.92) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }

        .enter-left  { animation: enterLeft  .34s cubic-bezier(.22,1,.36,1) both; }
        .enter-right { animation: enterRight .34s cubic-bezier(.22,1,.36,1) both; }
        .exit-left   { animation: exitLeft   .24s ease both; }
        .exit-right  { animation: exitRight  .24s ease both; }

        .ken        { animation: kenBurns 8s ease-in-out infinite alternate; }
        .glow-dot   { animation: glowPulse 2s ease infinite; }
        .zoom-in    { animation: zoomIn .4s cubic-bezier(.34,1.2,.64,1) both; }
        .modal-pop  { animation: modalPop .35s cubic-bezier(.34,1.2,.64,1) both; }
        .drawer-in  { animation: slideInDrawer .32s cubic-bezier(.22,1,.36,1) both; }
        .overlay-in { animation: fadeInOverlay .25s ease both; }

        .s1 { animation: fadeUp .45s ease .04s both; }
        .s2 { animation: fadeUp .45s ease .10s both; }
        .s3 { animation: fadeUp .45s ease .16s both; }
        .s4 { animation: fadeUp .45s ease .22s both; }
        .s5 { animation: fadeUp .45s ease .28s both; }
        .s6 { animation: fadeUp .45s ease .34s both; }

        .glass {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.1);
        }

        .cat-card { transition: transform .4s cubic-bezier(.34,1.4,.64,1), box-shadow .4s ease; cursor: pointer; }
        .cat-card:hover { transform: translateY(-6px) scale(1.02); }
        .cat-card:active { transform: scale(.95); transition-duration: .15s; }
        .cat-card .card-img { transition: transform .6s cubic-bezier(.25,1,.5,1); }
        .cat-card:hover .card-img { transform: scale(1.08); }
        .cat-card .shimmer { position:absolute; top:0; left:0; width:40%; height:100%; background:linear-gradient(to right,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%); opacity:0; pointer-events:none; }
        .cat-card:hover .shimmer { opacity:1; animation: shimmerMove .7s ease forwards; }
        .cat-card .accent-line { transition: width .4s cubic-bezier(.34,1.4,.64,1); }
        .cat-card:hover .accent-line { width: 56px !important; }

        .sub-img-card { transition: transform .3s cubic-bezier(.34,1.4,.64,1), box-shadow .3s ease; cursor: pointer; }
        .sub-img-card:hover { transform: translateY(-4px) scale(1.02); }
        .sub-img-card:active { transform: scale(.96); }
        .sub-img-card .sic-img { transition: transform .5s cubic-bezier(.25,1,.5,1); }
        .sub-img-card:hover .sic-img { transform: scale(1.07); }

        .circle-card { transition: transform .3s cubic-bezier(.34,1.4,.64,1); cursor: pointer; }
        .circle-card:hover { transform: translateY(-4px) scale(1.03); }
        .circle-card:active { transform: scale(.96); }
        .circle-card .circle-img { transition: transform .5s cubic-bezier(.25,1,.5,1); }
        .circle-card:hover .circle-img { transform: scale(1.08); }

        .sidebar-link { transition: color .2s ease, background .2s ease, padding-left .2s ease; cursor: pointer; }
        .sidebar-link:hover { padding-left: 24px !important; color: rgba(255,255,255,0.8) !important; }

        .back-btn { transition: opacity .2s, gap .2s; }
        .back-btn:hover { opacity: .8; gap: .6rem; }
        .back-arrow { transition: transform .25s cubic-bezier(.34,1.6,.64,1); }
        .back-btn:hover .back-arrow { transform: translateX(-3px); }

        .ham-btn { transition: background .2s ease; }
        .ham-btn:hover { background: rgba(255,255,255,0.12) !important; }

        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="f-body min-h-screen pb-8" style={{ background: "#0a0703" }}>
        <div className={pageClass}>

          {/* ═══════════════════════════════
              VIEW 1 — CATEGORY CARDS
          ═══════════════════════════════ */}
          {view === "categories" && (
            <div>
              {/* Hero */}
              <div className="relative overflow-hidden" style={{ minHeight: "340px", paddingTop: "56px" }}>
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80"
                  alt="hero"
                  className="ken absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.3) 0%, rgba(10,7,3,0.95) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,7,3,0.7) 0%, transparent 60%)" }} />
                <div className="absolute left-5 md:left-10" style={{ bottom: "3.5rem" }}>
                  <div className="flex items-center gap-2 mb-2 s1">
                    <span className="glow-dot w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                    <span className="text-[10px] tracking-[.22em] uppercase font-semibold hidden md:block" style={{ color: "#f59e0b" }}>
                      Brewhaus Cafe
                    </span>
                  </div>
                  <h1 className="f-display text-white leading-tight s2" style={{ fontSize: "clamp(1.8rem,6vw,3rem)" }}>
                    What are you
                  </h1>
                  <h1 className="f-display s3" style={{ fontSize: "clamp(1.8rem,6vw,3rem)", color: "#f59e0b", lineHeight: "1.15", paddingBottom: "4px" }}>
                    craving today?
                  </h1>
                </div>
              </div>

              {/* Label */}
              <div className="px-4 pt-6 pb-3 md:px-10 s2">
                <p className="text-[10px] tracking-[.22em] uppercase font-semibold" style={{ color: "#57534e" }}>
                  Browse Categories
                </p>
              </div>

              {/* Grid */}
              <div className="px-4 md:px-8 max-w-2xl mx-auto md:max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {menuData.map((cat, i) => {
                    const acc = accents[cat.id] ?? "#f59e0b";
                    const isHov = hoveredCard === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => openCategory(cat)}
                        onMouseEnter={() => setHoveredCard(cat.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`cat-card relative rounded-3xl overflow-hidden text-left s${i + 2}`}
                        style={{
                          aspectRatio: "3/4",
                          border: `1px solid ${isHov ? `${acc}40` : "rgba(255,255,255,0.06)"}`,
                          boxShadow: isHov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${acc}20` : "0 4px 20px rgba(0,0,0,0.3)",
                          transition: "border-color .3s, box-shadow .4s",
                        }}
                      >
                        <img src={cat.bgImage} alt={cat.name} className="card-img absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)", opacity: 0.85 }} />
                        <div className="absolute inset-0" style={{ background: `${acc}12` }} />
                        <div className="shimmer" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="glass text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            {cat.subcategories.length} types
                          </span>
                          <span style={{ fontSize: "1.5rem", filter: isHov ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none", transition: "filter .3s" }}>
                            {cat.icon}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-end justify-between">
                            <h3 className="f-display text-white text-xl leading-none">{cat.name}</h3>
                            <div className="w-7 h-7 glass rounded-full flex items-center justify-center" style={{ background: isHov ? `${acc}30` : "rgba(255,255,255,0.08)", transition: "background .3s" }}>
                              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke={acc} strokeWidth={3}>
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </div>
                          </div>
                          <div className="accent-line mt-3 h-0.5 rounded-full" style={{ background: acc, width: isHov ? "56px" : "32px", opacity: 0.8, transition: "width .4s cubic-bezier(.34,1.4,.64,1)" }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════
              VIEW 2 — SUBCATEGORIES
          ═══════════════════════════════ */}
          {view === "subcategories" && selectedCategory && (
            <div className="flex min-h-screen" style={{ paddingTop: "56px" }}>

              {/* Mobile drawer overlay */}
              {sidebarOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 overlay-in md:hidden"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                    onClick={() => setSidebarOpen(false)}
                  />
                  <div
                    className="fixed top-0 left-0 bottom-0 z-50 drawer-in md:hidden overflow-hidden"
                    style={{ width: "72vw", maxWidth: "280px", background: "#131007", borderRight: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Drawer header */}
                    <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="f-display text-white text-base font-bold">Menu</p>
                      <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 glass rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <SidebarContent onClose={() => setSidebarOpen(false)} />
                  </div>
                </>
              )}

              {/* Desktop sidebar */}
              <div
                className="hidden md:flex flex-col shrink-0 overflow-hidden sticky top-14"
                style={{ width: "220px", height: "calc(100vh - 56px)", background: "#0d0a05", borderRight: "1px solid rgba(255,255,255,0.06)" }}
              >
                <SidebarContent />
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-y-auto">
                {/* Mobile top bar */}
                <div className="flex items-center gap-3 px-4 py-3 md:hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="ham-btn flex flex-col gap-1 p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span className="w-5 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                    <span className="w-4 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                    <span className="w-5 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                  </button>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: "#57534e" }}>Browsing</p>
                    <p className="f-display text-white text-base leading-none">{selectedCategory.name}</p>
                  </div>
                </div>

                {/* Page title */}
                <div className="px-5 pt-6 pb-4 md:px-8">
                  <p className="text-[9px] tracking-[.2em] uppercase font-semibold mb-1 s1" style={{ color: "#57534e" }}>
                    Menu / <span style={{ color: accent }}>{selectedCategory.name}</span>
                  </p>
                  <h2 className="f-display text-white text-2xl md:text-3xl leading-none s2">
                    {selectedCategory.name}
                  </h2>
                </div>

                {/* Subcategory image grid */}
                <div className="px-4 pb-8 md:px-8">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedCategory.subcategories.map((sub, i) => {
                      const isHov = hoveredCard === `sub-${sub.id}`;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => openSub(sub)}
                          onMouseEnter={() => setHoveredCard(`sub-${sub.id}`)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className={`sub-img-card text-left rounded-2xl overflow-hidden s${i + 1}`}
                          style={{
                            background: "#1a1107",
                            border: `1px solid ${isHov ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
                            boxShadow: isHov ? `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}15` : "0 4px 16px rgba(0,0,0,0.3)",
                            transition: "border-color .3s, box-shadow .3s",
                          }}
                        >
                          <div className="flex flex-col items-center pt-6 pb-4 px-4">
                            <div
                              className="relative overflow-hidden rounded-full"
                              style={{
                                width: "clamp(80px, 22vw, 140px)",
                                height: "clamp(80px, 22vw, 140px)",
                                border: `3px solid ${isHov ? `${accent}60` : "rgba(255,255,255,0.08)"}`,
                                boxShadow: isHov ? `0 0 24px ${accent}30` : "none",
                                transition: "border-color .3s, box-shadow .3s",
                                background: "#0d0a05",
                              }}
                            >
                              <img src={sub.items[0]?.image} alt={sub.name} className="sic-img w-full h-full object-cover" />
                            </div>
                            <p className="f-display text-center mt-3 text-sm md:text-base leading-tight" style={{ color: isHov ? "white" : "rgba(255,255,255,0.85)", transition: "color .2s" }}>
                              {sub.name}
                            </p>
                            <p className="text-[10px] mt-1" style={{ color: "#57534e" }}>
                              {sub.items.length} items
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════
              VIEW 3 — ITEMS GRID
          ═══════════════════════════════ */}
          {view === "items" && selectedCategory && selectedSub && (
            <div className="flex min-h-screen" style={{ paddingTop: "56px" }}>

              {/* Mobile drawer overlay */}
              {sidebarOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 overlay-in md:hidden"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                    onClick={() => setSidebarOpen(false)}
                  />
                  <div
                    className="fixed top-0 left-0 bottom-0 z-50 drawer-in md:hidden overflow-hidden"
                    style={{ width: "72vw", maxWidth: "280px", background: "#131007", borderRight: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="f-display text-white text-base font-bold">Menu</p>
                      <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 glass rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <SidebarContent onClose={() => setSidebarOpen(false)} />
                  </div>
                </>
              )}

              {/* Desktop sidebar */}
              <div
                className="hidden md:flex flex-col shrink-0 overflow-hidden sticky top-14"
                style={{ width: "220px", height: "calc(100vh - 56px)", background: "#0d0a05", borderRight: "1px solid rgba(255,255,255,0.06)" }}
              >
                <SidebarContent />
              </div>

              {/* Main items area */}
              <div className="flex-1 overflow-y-auto">
                {/* Mobile top bar */}
                <div className="flex items-center gap-3 px-4 py-3 md:hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="ham-btn flex flex-col gap-1 p-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span className="w-5 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                    <span className="w-4 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                    <span className="w-5 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                  </button>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: "#57534e" }}>
                      {selectedCategory.name}
                    </p>
                    <p className="f-display text-white text-base leading-none">{selectedSub.name}</p>
                  </div>
                </div>

                {/* Breadcrumb + title */}
                <div className="px-5 pt-6 pb-4 md:px-8">
                  <p className="text-[9px] tracking-[.2em] uppercase font-semibold mb-1 s1" style={{ color: "#57534e" }}>
                    Menu / <span style={{ color: "rgba(255,255,255,0.4)" }}>{selectedCategory.name}</span> / <span style={{ color: accent }}>{selectedSub.name}</span>
                  </p>
                  <div className="flex items-end justify-between s2">
                    <h2 className="f-display text-white text-2xl md:text-3xl leading-none">{selectedSub.name}</h2>
                    <div className="glass px-3 py-1.5 rounded-full">
                      <span className="text-[10px] font-semibold" style={{ color: accent }}>
                        {selectedSub.items.filter(i => i.isAvailable).length} available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Circular items grid */}
                <div className="px-4 pb-8 md:px-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedSub.items.map((item, i) => {
                      const isHov = hoveredCard === `item-${item.id}`;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          onMouseEnter={() => setHoveredCard(`item-${item.id}`)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className="circle-card flex flex-col items-center py-4 px-2 rounded-2xl zoom-in"
                          style={{
                            animationDelay: `${i * 0.06}s`,
                            background: isHov ? "#1a1107" : "transparent",
                            border: `1px solid ${isHov ? `${accent}30` : "transparent"}`,
                            transition: "background .25s, border-color .25s",
                          }}
                        >
                          <div
                            className="relative overflow-hidden rounded-full"
                            style={{
                              width: "clamp(80px, 20vw, 120px)",
                              height: "clamp(80px, 20vw, 120px)",
                              border: `3px solid ${isHov ? `${accent}60` : "rgba(255,255,255,0.08)"}`,
                              boxShadow: isHov ? `0 0 20px ${accent}30` : "none",
                              transition: "border-color .3s, box-shadow .3s",
                              background: "#0d0a05",
                            }}
                          >
                            <img src={item.image} alt={item.name} className="circle-img w-full h-full object-cover" />
                            {!item.isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ background: "rgba(0,0,0,0.65)" }}>
                                <span className="text-white text-[9px] font-bold">Sold Out</span>
                              </div>
                            )}
                          </div>
                          <p
                            className="text-center text-xs font-medium mt-3 leading-tight px-1"
                            style={{
                              color: isHov ? "white" : "rgba(255,255,255,0.75)",
                              transition: "color .2s",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.name}
                          </p>
                          <p className="f-display text-sm mt-1" style={{ color: isHov ? accent : `${accent}90`, transition: "color .2s" }}>
                            ₱{item.price}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ═══════════════════════════════
          MODAL
      ═══════════════════════════════ */}
      {selectedItem && selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-in"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="modal-pop relative w-full max-w-2xl overflow-hidden"
            style={{
              background: "#131007",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{ width: "100%", height: "220px", borderRadius: "24px 24px 0 0" }}
              >
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" style={{ minHeight: "220px" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,16,7,0.6) 0%, transparent 50%)" }} />
              </div>

              {/* Info */}
              <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto" style={{ maxHeight: "70vh" }}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center"
                  style={{ zIndex: 10 }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>

                <div>
                  <p className="text-[9px] tracking-[.2em] uppercase font-semibold mb-3" style={{ color: "#57534e" }}>
                    {selectedCategory.name} · {selectedSub?.name}
                  </p>
                  <h2 className="f-display text-white leading-tight mb-2" style={{ fontSize: "clamp(1.2rem,4vw,1.8rem)" }}>
                    {selectedItem.name}
                  </h2>
                  <p className="f-display mb-4" style={{ fontSize: "1.5rem", color: accent }}>
                    ₱{selectedItem.price}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#a8a29e" }}>
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: selectedItem.isAvailable ? "#34d399" : "#57534e",
                        boxShadow: selectedItem.isAvailable ? "0 0 8px rgba(52,211,153,0.6)" : "none",
                      }}
                    />
                    <span className="text-xs font-medium" style={{ color: selectedItem.isAvailable ? "#34d399" : "#57534e" }}>
                      {selectedItem.isAvailable ? "Available now" : "Currently unavailable"}
                    </span>
                  </div>
                </div>

                {selectedSub && selectedSub.items.filter(i => i.id !== selectedItem.id).length > 0 && (
                  <div className="mt-6">
                    <p className="text-[10px] tracking-[.2em] uppercase font-semibold mb-3" style={{ color: "#57534e" }}>
                      You may also like
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {selectedSub.items.filter(i => i.id !== selectedItem.id).slice(0, 4).map((related) => (
                        <button
                          key={related.id}
                          onClick={() => setSelectedItem(related)}
                          className="flex flex-col items-center shrink-0"
                          style={{ width: "72px" }}
                        >
                          <div className="rounded-full overflow-hidden" style={{ width: "56px", height: "56px", border: "2px solid rgba(255,255,255,0.1)", background: "#0d0a05" }}>
                            <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-center text-[10px] mt-1.5 leading-tight" style={{ color: "rgba(255,255,255,0.5)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {related.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}