import { useState } from "react";
import { menuData } from "../data/menuData";
import type { Category, SubCategory } from "../data/menuData";

type View = "categories" | "subcategories" | "items";

export default function Landing() {
  const [view, setView] = useState<View>("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [visible, setVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const go = (fn: () => void, dir: "left" | "right") => {
    if (transitioning) return;
    setSlideDir(dir);
    setVisible(false);
    setTransitioning(true);
    setTimeout(() => { fn(); setVisible(true); setTransitioning(false); }, 280);
  };

  const openCategory = (cat: Category) =>
    go(() => { setSelectedCategory(cat); setSelectedSub(null); setView("subcategories"); }, "left");
  const openSub = (sub: SubCategory) =>
    go(() => { setSelectedSub(sub); setView("items"); }, "left");
  const goBack = () =>
    go(() => {
      if (view === "items") { setView("subcategories"); setSelectedSub(null); }
      else { setView("categories"); setSelectedCategory(null); }
    }, "right");

  const accents: Record<string, string> = {
    drinks: "#f59e0b", meals: "#ef4444",
    desserts: "#ec4899", snacks: "#eab308", combos: "#10b981",
  };

  const pageClass = !visible
    ? (slideDir === "left" ? "exit-left" : "exit-right")
    : (slideDir === "left" ? "enter-left" : "enter-right");

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
        @keyframes zoomIn     { from { opacity:0; transform:scale(0.93); }     to { opacity:1; transform:scale(1);    } }
        @keyframes kenBurns   { from { transform:scale(1.0); } to { transform:scale(1.07); } }
        @keyframes glowPulse  { 0%,100% { opacity:.5; } 50% { opacity:1; } }
        @keyframes shimmerMove {
          0%   { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(250%) rotate(25deg); }
        }
        @keyframes borderGlow {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 1;   }
        }
        @keyframes floatUp {
          from { transform: translateY(6px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }

        .enter-left  { animation: enterLeft  .34s cubic-bezier(.22,1,.36,1) both; }
        .enter-right { animation: enterRight .34s cubic-bezier(.22,1,.36,1) both; }
        .exit-left   { animation: exitLeft   .24s ease both; }
        .exit-right  { animation: exitRight  .24s ease both; }

        .ken  { animation: kenBurns 8s ease-in-out infinite alternate; }
        .glow-dot { animation: glowPulse 2s ease infinite; }

        .s1 { animation: fadeUp .45s ease .04s both; }
        .s2 { animation: fadeUp .45s ease .10s both; }
        .s3 { animation: fadeUp .45s ease .16s both; }
        .s4 { animation: fadeUp .45s ease .22s both; }
        .s5 { animation: fadeUp .45s ease .28s both; }
        .s6 { animation: fadeUp .45s ease .34s both; }

        .zoom-in { animation: zoomIn .4s cubic-bezier(.34,1.2,.64,1) both; }

        .glass {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.1);
        }

        /* ── Category card hover ── */
        .cat-card {
          transition:
            transform .4s cubic-bezier(.34,1.4,.64,1),
            box-shadow .4s ease;
          cursor: pointer;
        }
        .cat-card:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .cat-card:active {
          transform: scale(.95) translateY(0);
          transition-duration: .15s;
        }
        .cat-card .card-img {
          transition: transform .6s cubic-bezier(.25,1,.5,1);
        }
        .cat-card:hover .card-img {
          transform: scale(1.08);
        }
        .cat-card .card-overlay {
          transition: opacity .4s ease;
        }
        .cat-card:hover .card-overlay {
          opacity: 0.55 !important;
        }
        .cat-card .shimmer {
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255,255,255,0.12) 50%,
            transparent 100%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity .1s;
        }
        .cat-card:hover .shimmer {
          opacity: 1;
          animation: shimmerMove .7s ease forwards;
        }
        .cat-card .arrow-btn {
          transition: transform .3s cubic-bezier(.34,1.6,.64,1), background .3s ease;
        }
        .cat-card:hover .arrow-btn {
          transform: translateX(4px);
        }
        .cat-card .accent-line {
          transition: width .4s cubic-bezier(.34,1.4,.64,1);
        }
        .cat-card:hover .accent-line {
          width: 56px !important;
        }
        .cat-card .cat-label {
          transition: opacity .3s ease, transform .3s ease;
        }
        .cat-card:hover .cat-label {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* ── Sub card hover ── */
        .sub-card {
          transition:
            transform .35s cubic-bezier(.34,1.4,.64,1),
            box-shadow .35s ease,
            border-color .3s ease;
          cursor: pointer;
        }
        .sub-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
        .sub-card:active {
          transform: scale(.96);
          transition-duration: .12s;
        }
        .sub-card .sub-img {
          transition: transform .5s cubic-bezier(.25,1,.5,1);
        }
        .sub-card:hover .sub-img {
          transform: scale(1.07);
        }
        .sub-card .explore-arrow {
          transition: transform .3s cubic-bezier(.34,1.6,.64,1), background .3s ease;
        }
        .sub-card:hover .explore-arrow {
          transform: translateX(3px);
        }
        .sub-card .explore-text {
          transition: letter-spacing .3s ease;
        }
        .sub-card:hover .explore-text {
          letter-spacing: .08em;
        }

        /* ── Item card hover ── */
        .item-card {
          transition:
            transform .35s cubic-bezier(.34,1.4,.64,1),
            box-shadow .35s ease;
          cursor: default;
        }
        .item-card:hover {
          transform: translateY(-4px);
        }
        .item-card .item-img {
          transition: transform .5s cubic-bezier(.25,1,.5,1);
        }
        .item-card:hover .item-img {
          transform: scale(1.06);
        }
        .item-card .price-label {
          transition: transform .3s cubic-bezier(.34,1.4,.64,1);
        }
        .item-card:hover .price-label {
          transform: scale(1.05);
        }
        .item-card .item-accent {
          transition: width .4s cubic-bezier(.34,1.4,.64,1), opacity .3s ease;
        }
        .item-card:hover .item-accent {
          width: 48px !important;
          opacity: .9 !important;
        }

        /* ── Back button hover ── */
        .back-btn {
          transition: gap .25s ease, opacity .25s ease, transform .25s ease;
        }
        .back-btn:hover {
          gap: .6rem;
          opacity: .85;
        }
        .back-btn:hover .back-arrow {
          transform: translateX(-3px);
        }
        .back-arrow {
          transition: transform .25s cubic-bezier(.34,1.6,.64,1);
        }

        /* ── Nav hover (desktop) ── */
        .nav-link {
          transition: color .2s ease, background .2s ease;
        }

        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="f-body min-h-screen pb-8" style={{ background: "#0a0703" }}>
        <div className={pageClass}>

          {/* ═══════════════════════════════
              CATEGORIES
          ═══════════════════════════════ */}
          {view === "categories" && (
            <div>
              {/* Hero */}
                <div className="relative overflow-hidden" style={{ height: "260px", paddingTop: "56px" }}>
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80"
                    alt="hero"
                    className="ken absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.3) 0%, rgba(10,7,3,0.95) 100%)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,7,3,0.7) 0%, transparent 60%)" }} />

                  <div className="absolute bottom-8 left-5 md:left-10">
                    <div className="flex items-center gap-2 mb-2 s1">
                      <span className="glow-dot w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
                      <span className="text-[10px] tracking-[.22em] uppercase font-semibold hidden md:block" style={{ color: "#f59e0b" }}>
                        Brewhaus Cafe
                      </span>
                    </div>
                    <h1 className="f-display text-white leading-none s2" style={{ fontSize: "clamp(1.8rem,6vw,3rem)" }}>
                      What are you
                    </h1>
                    <h1 className="f-display leading-none s3" style={{ fontSize: "clamp(1.8rem,6vw,3rem)", color: "#f59e0b" }}>
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
                    const accent = accents[cat.id] ?? "#f59e0b";
                    const isHovered = hoveredCard === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => openCategory(cat)}
                        onMouseEnter={() => setHoveredCard(cat.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`cat-card relative rounded-3xl overflow-hidden text-left s${i + 2}`}
                        style={{
                          aspectRatio: "3/4",
                          border: `1px solid ${isHovered ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
                          boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${accent}20` : "0 4px 20px rgba(0,0,0,0.3)",
                          transition: "border-color .3s ease, box-shadow .4s ease",
                        }}
                      >
                        <img src={cat.bgImage} alt={cat.name} className="card-img absolute inset-0 w-full h-full object-cover" />
                        <div className="card-overlay absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)", opacity: 0.85 }} />
                        <div className="absolute inset-0" style={{ background: `${accent}12` }} />
                        {/* shimmer sweep on hover */}
                        <div className="shimmer" />

                        {/* Top */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="glass text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            {cat.subcategories.length} types
                          </span>
                          <span style={{ fontSize: "1.5rem", filter: isHovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none", transition: "filter .3s ease" }}>
                            {cat.icon}
                          </span>
                        </div>

                        {/* Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p
                            className="cat-label text-[9px] tracking-[.18em] uppercase mb-0.5"
                            style={{ color: "rgba(255,255,255,0.4)", opacity: isHovered ? 1 : 0.6, transform: isHovered ? "translateY(0)" : "translateY(2px)", transition: "opacity .3s, transform .3s" }}
                          >
                            Category
                          </p>
                          <div className="flex items-end justify-between">
                            <h3 className="f-display text-white text-xl leading-none" style={{ textShadow: isHovered ? `0 0 20px ${accent}60` : "none", transition: "text-shadow .3s ease" }}>
                              {cat.name}
                            </h3>
                            <div
                              className="arrow-btn w-7 h-7 glass rounded-full flex items-center justify-center"
                              style={{ background: isHovered ? `${accent}30` : "rgba(255,255,255,0.08)", borderColor: isHovered ? `${accent}50` : "rgba(255,255,255,0.1)", transition: "background .3s, border-color .3s" }}
                            >
                              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke={accent} strokeWidth={3}>
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </div>
                          </div>
                          <div
                            className="accent-line mt-3 h-0.5 rounded-full"
                            style={{ background: accent, width: isHovered ? "56px" : "32px", opacity: 0.8, transition: "width .4s cubic-bezier(.34,1.4,.64,1)" }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════
              SUBCATEGORIES
          ═══════════════════════════════ */}
          {view === "subcategories" && selectedCategory && (() => {
            const accent = accents[selectedCategory.id] ?? "#f59e0b";
            return (
              <div>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={selectedCategory.bgImage} alt={selectedCategory.name} className="ken absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.4) 0%, rgba(10,7,3,0.97) 100%)" }} />

                  <button
                    onClick={goBack}
                    className="back-btn absolute left-4 glass flex items-center gap-1.5 text-white text-sm font-medium px-3.5 py-2 rounded-full s1 md:top-5"
                    style={{ top: "4.5rem" }}
                  >
                    <svg viewBox="0 0 24 24" className="back-arrow w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                  </button>

                  <div className="absolute bottom-7 left-5 md:left-10">
                    <p className="text-[10px] tracking-[.22em] uppercase font-bold mb-1 s1" style={{ color: accent }}>
                      {selectedCategory.icon} {selectedCategory.name}
                    </p>
                    <h2 className="f-display text-white leading-none s2" style={{ fontSize: "clamp(1.5rem,5vw,2.5rem)" }}>
                      Pick a <span style={{ color: accent }}>type</span>
                    </h2>
                  </div>
                </div>

                <div className="px-4 pt-4 md:px-8 max-w-2xl mx-auto md:max-w-5xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCategory.subcategories.map((sub, i) => {
                      const isHov = hoveredCard === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => openSub(sub)}
                          onMouseEnter={() => setHoveredCard(sub.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          className={`sub-card relative rounded-3xl overflow-hidden text-left s${i + 1}`}
                          style={{
                            aspectRatio: "3/4",
                            background: "#1a1107",
                            border: `1px solid ${isHov ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
                            boxShadow: isHov ? `0 16px 48px rgba(0,0,0,0.5), 0 0 24px ${accent}18` : "0 4px 16px rgba(0,0,0,0.3)",
                            transition: "border-color .3s ease, box-shadow .35s ease",
                          }}
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden" style={{ height: "60%" }}>
                            <img src={sub.items[0]?.image} alt={sub.name} className="sub-img w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1a1107 100%)" }} />
                            <div
                              className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full"
                              style={{ borderColor: isHov ? `${accent}40` : "rgba(255,255,255,0.1)", transition: "border-color .3s" }}
                            >
                              <span className="text-white text-[10px] font-semibold">{sub.items.length} items</span>
                            </div>
                          </div>

                          {/* Bottom */}
                          <div className="p-4 flex flex-col justify-between" style={{ height: "40%" }}>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span style={{ fontSize: "1.2rem", filter: isHov ? "drop-shadow(0 0 6px rgba(255,255,255,0.3))" : "none", transition: "filter .3s" }}>{sub.icon}</span>
                                <h3 className="text-white font-semibold text-sm leading-tight">{sub.name}</h3>
                              </div>
                              <div className="flex gap-1 mt-1.5">
                                {sub.items.slice(0, 3).map((item) => (
                                  <div
                                    key={item.id}
                                    className="w-5 h-5 rounded-full overflow-hidden"
                                    style={{ border: `1px solid ${isHov ? `${accent}50` : "rgba(255,255,255,0.15)"}`, transition: "border-color .3s, transform .3s", transform: isHov ? "scale(1.1)" : "scale(1)" }}
                                  >
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                                {sub.items.length > 3 && (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                                    <span className="text-[8px] font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>+{sub.items.length - 3}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span
                                className="explore-text text-[10px] font-semibold"
                                style={{ color: accent, letterSpacing: isHov ? ".08em" : ".04em", transition: "letter-spacing .3s" }}
                              >
                                Explore
                              </span>
                              <div
                                className="explore-arrow w-6 h-6 rounded-full flex items-center justify-center"
                                style={{
                                  background: isHov ? `${accent}30` : `${accent}18`,
                                  transform: isHov ? "translateX(3px)" : "translateX(0)",
                                  transition: "background .3s, transform .3s cubic-bezier(.34,1.6,.64,1)",
                                }}
                              >
                                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke={accent} strokeWidth={3}>
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════
              ITEMS
          ═══════════════════════════════ */}
          {view === "items" && selectedCategory && selectedSub && (() => {
            const accent = accents[selectedCategory.id] ?? "#f59e0b";
            return (
              <div>
                {/* Sticky header */}
                <div
                  className="sticky top-0 z-20 px-4 pb-4 md:px-8"
                    style={{
                      paddingTop: "calc(3.5rem + 16px)", // clears the fixed mobile bar
                      background: "rgba(10,7,3,0.92)",
                      backdropFilter: "blur(20px)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)"
                    }}>
                  <button
                    onClick={goBack}
                    className="back-btn flex items-center gap-1.5 text-sm font-medium mb-3 s1"
                    style={{ color: accent }}
                  >
                    <svg viewBox="0 0 24 24" className="back-arrow w-4 h-4" fill="none" stroke={accent} strokeWidth={2.5}>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    {selectedCategory.name} · {selectedSub.name}
                  </button>
                  <div className="flex items-end justify-between s2">
                    <div>
                      <p className="text-[10px] tracking-[.2em] uppercase font-semibold mb-0.5" style={{ color: "#57534e" }}>
                        {selectedSub.icon} {selectedSub.name}
                      </p>
                      <h2 className="f-display text-white text-2xl leading-none">
                        {selectedSub.items.length} <span style={{ color: accent }}>Items</span>
                      </h2>
                    </div>
                    <div className="glass px-3 py-1.5 rounded-full">
                      <span className="text-[10px] font-semibold" style={{ color: accent }}>
                        {selectedSub.items.filter(i => i.isAvailable).length} available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items grid */}
                <div className="px-4 pt-4 pb-6 md:px-8 max-w-2xl mx-auto md:max-w-5xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedSub.items.map((item, i) => {
                      const isHov = hoveredCard === item.id;
                      return (
                        <div
                          key={item.id}
                          className="item-card zoom-in rounded-3xl overflow-hidden"
                          onMouseEnter={() => setHoveredCard(item.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            animationDelay: `${i * 0.07}s`,
                            background: "#1a1107",
                            border: `1px solid ${isHov ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
                            boxShadow: isHov ? `0 16px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}18` : "0 4px 16px rgba(0,0,0,0.3)",
                            transition: "border-color .3s, box-shadow .35s",
                          }}
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                            <img src={item.image} alt={item.name} className="item-img w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1a1107 0%, transparent 50%)" }} />
                            {!item.isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                                <span className="glass text-white text-[10px] font-bold px-3 py-1 rounded-full">Sold Out</span>
                              </div>
                            )}
                            {item.isAvailable && (
                              <div
                                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                                style={{
                                  background: "#34d399",
                                  boxShadow: isHov ? "0 0 12px rgba(52,211,153,0.9)" : "0 0 6px rgba(52,211,153,0.6)",
                                  transition: "box-shadow .3s ease",
                                }}
                              />
                            )}
                            {/* hover tint */}
                            <div
                              className="absolute inset-0"
                              style={{
                                background: `${accent}10`,
                                opacity: isHov ? 1 : 0,
                                transition: "opacity .3s ease",
                              }}
                            />
                          </div>

                          {/* Info */}
                          <div className="p-3">
                            <h3
                              className="text-white font-semibold text-sm leading-tight"
                              style={{
                                overflow: "hidden", display: "-webkit-box",
                                WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
                                color: isHov ? "#fff" : "rgba(255,255,255,0.9)",
                                transition: "color .2s",
                              }}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-[11px] leading-relaxed mt-1"
                              style={{
                                color: isHov ? "#a8a29e" : "#57534e",
                                overflow: "hidden", display: "-webkit-box",
                                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                transition: "color .2s",
                              }}
                            >
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="price-label">
                                <p className="text-[9px] uppercase tracking-widest" style={{ color: `${accent}70` }}>Price</p>
                                <p
                                  className="f-display text-lg leading-none"
                                  style={{
                                    color: accent,
                                    textShadow: isHov ? `0 0 16px ${accent}60` : "none",
                                    transition: "text-shadow .3s ease",
                                  }}
                                >
                                  ₱{item.price}
                                </p>
                              </div>
                              <div
                                className="item-accent h-0.5 rounded-full"
                                style={{
                                  background: accent,
                                  width: isHov ? "48px" : "24px",
                                  opacity: isHov ? 0.9 : 0.4,
                                  transition: "width .4s cubic-bezier(.34,1.4,.64,1), opacity .3s",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </>
  );
}