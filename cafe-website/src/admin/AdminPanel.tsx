// src/admin/AdminPanel.tsx

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { menuData } from "../data/menuData";
import type { Category, SubCategory, MenuItem } from "../data/menuData";
import { useAdminAuth } from "./useAdminAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "products" | "preview";

const generateId = () => `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

const accentMap: Record<string, string> = {
  drinks: "#f59e0b",
  meals: "#ef4444",
  desserts: "#ec4899",
  snacks: "#eab308",
  combos: "#10b981",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all";
const labelCls =
  "text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1";

// ─── Add Item Modal ───────────────────────────────────────────────────────────
function AddItemModal({
  categoryId,
  subId,
  onClose,
  onAdd,
}: {
  categoryId: string;
  subId: string;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const accent = accentMap[categoryId] ?? "#f59e0b";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImageUrl(url);
  };

  const handleSubmit = () => {
    if (!name.trim()) { alert("Enter a product name."); return; }
    if (!price || Number(price) <= 0) { alert("Enter a valid price."); return; }
    onAdd({
      id: generateId(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: imageUrl || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
      isAvailable: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden" style={{ background: "#1a1107", border: `1px solid ${accent}30` }}>
        <div className="h-1" style={{ background: `linear-gradient(to right, ${accent}, ${accent}80)` }} />
        <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <h2 className="text-white font-bold text-lg">New Item</h2>
            <p className="text-white/40 text-xs mt-0.5">Add to this subcategory</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Photo */}
          <div>
            <label className={labelCls}>Photo</label>
            <button onClick={() => fileRef.current?.click()} className="w-full h-32 rounded-2xl overflow-hidden relative flex items-center justify-center" style={{ border: `2px dashed ${accent}40`, background: "rgba(255,255,255,0.04)" }}>
              {imagePreview
                ? <img src={imagePreview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                : <div className="text-center">
                    <span className="text-3xl block mb-1">📷</span>
                    <p className="text-white/30 text-xs">Tap to upload photo</p>
                  </div>
              }
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {imagePreview && <button onClick={() => { setImagePreview(""); setImageUrl(""); }} className="text-xs text-white/30 mt-1 hover:text-red-400 transition-colors">Remove photo</button>}
          </div>

          {/* Name */}
          <div>
            <label className={labelCls}>Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ube Latte" className={inputCls} />
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>Price (₱) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold" style={{ color: accent }}>₱</span>
              <input
                type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" min={0}
                className="w-full rounded-xl pl-8 pr-3 py-2.5 text-lg font-bold focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.08)", border: `2px solid ${accent}50`, color: accent }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe this item..." rows={3} className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="px-5 pb-5 pt-3 flex gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white/50 transition-colors hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95" style={{ background: accent, boxShadow: `0 8px 24px ${accent}40` }}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Item Row ─────────────────────────────────────────────────────────────────
function ItemRow({
  item,
  accent,
  onChange,
  onDelete,
}: {
  item: MenuItem;
  accent: string;
  onChange: (updated: MenuItem) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({ ...item, image: URL.createObjectURL(file) });
  };

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200" style={{
      background: "rgba(255,255,255,0.04)",
      border: expanded ? `1px solid ${accent}40` : "1px solid rgba(255,255,255,0.07)",
    }}>
      {/* Collapsed */}
      <div className="flex items-center gap-3 p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="relative shrink-0">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
          <button
            onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
            style={{ background: accent }}
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{item.name}</p>
          <p className="text-white/40 text-xs truncate">{item.description}</p>
        </div>

        <span className="font-bold text-sm shrink-0" style={{ color: accent }}>₱{item.price}</span>

        <button
          onClick={e => { e.stopPropagation(); onChange({ ...item, isAvailable: !item.isAvailable }); }}
          className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
          style={item.isAvailable
            ? { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" }
            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)" }
          }
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </button>

        <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <label className={labelCls}>Name</label>
            <input type="text" value={item.name} onChange={e => onChange({ ...item, name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price (₱)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-base" style={{ color: accent }}>₱</span>
              <input
                type="number" value={item.price} onChange={e => onChange({ ...item, price: Number(e.target.value) })} min={0}
                className="w-full rounded-xl pl-8 pr-3 py-2.5 text-lg font-bold focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: `2px solid ${accent}50`, color: accent }}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={item.description} onChange={e => onChange({ ...item, description: e.target.value })} rows={2} className={`${inputCls} resize-none`} />
          </div>
          <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={onDelete} className="text-red-400/70 text-xs font-semibold flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" /></svg>
              Remove item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Subcategory Section ──────────────────────────────────────────────────────
function SubCategorySection({
  sub,
  categoryId,
  onChange,
  onAddItem,
}: {
  sub: SubCategory;
  categoryId: string;
  onChange: (updated: SubCategory) => void;
  onAddItem: () => void;
}) {
  const [open, setOpen] = useState(false);
  const accent = accentMap[categoryId] ?? "#f59e0b";

  const updateItem = (idx: number, updated: MenuItem) => {
    const items = [...sub.items];
    items[idx] = updated;
    onChange({ ...sub, items });
  };

  const deleteItem = (idx: number) => {
    onChange({ ...sub, items: sub.items.filter((_, i) => i !== idx) });
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Sub header */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xl">{sub.icon}</span>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{sub.name}</p>
          <p className="text-white/30 text-[10px]">{sub.items.length} items · {sub.items.filter(i => i.isAvailable).length} available</p>
        </div>
        <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="pt-2 space-y-2">
            {sub.items.map((item, idx) => (
              <ItemRow
                key={item.id}
                item={item}
                accent={accent}
                onChange={updated => updateItem(idx, updated)}
                onDelete={() => deleteItem(idx)}
              />
            ))}
          </div>
          <button
            onClick={onAddItem}
            className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            style={{ border: `1px dashed ${accent}40`, color: `${accent}80` }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
            Add item to {sub.name}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Category Panel ───────────────────────────────────────────────────────────
function CategoryPanel({
  cat,
  onChange,
}: {
  cat: Category;
  onChange: (updated: Category) => void;
}) {
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState<{ subId: string } | null>(null);
  const accent = accentMap[cat.id] ?? "#f59e0b";

  const available = cat.subcategories.reduce((a, s) => a + s.items.filter(i => i.isAvailable).length, 0);
  const total = cat.subcategories.reduce((a, s) => a + s.items.length, 0);

  const updateSub = (idx: number, updated: SubCategory) => {
    const subs = [...cat.subcategories];
    subs[idx] = updated;
    onChange({ ...cat, subcategories: subs });
  };

  const addItemToSub = (subId: string, item: MenuItem) => {
    const subs = cat.subcategories.map(s =>
      s.id === subId ? { ...s, items: [...s.items, item] } : s
    );
    onChange({ ...cat, subcategories: subs });
  };

  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: "#1a1107", border: `1px solid ${open ? `${accent}30` : "rgba(255,255,255,0.07)"}`, transition: "border-color .3s" }}>
      {/* Category header */}
      <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 relative">
          <img src={cat.bgImage} alt={cat.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `${accent}30` }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cat.icon}</span>
            <h3 className="text-white font-bold text-base">{cat.name}</h3>
          </div>
          <p className="text-white/30 text-xs mt-0.5">
            {cat.subcategories.length} subcategories · {total} items · {available} available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${accent}20`, color: accent }}>
            {available}/{total}
          </div>
          <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Subcategories */}
      {open && (
        <div className="px-4 pb-4 space-y-3" style={{ borderTop: `1px solid ${accent}20` }}>
          <div className="pt-3 space-y-3">
            {cat.subcategories.map((sub, idx) => (
              <SubCategorySection
                key={sub.id}
                sub={sub}
                categoryId={cat.id}
                onChange={updated => updateSub(idx, updated)}
                onAddItem={() => setAddModal({ subId: sub.id })}
              />
            ))}
          </div>
        </div>
      )}

      {addModal && (
        <AddItemModal
          categoryId={cat.id}
          subId={addModal.subId}
          onClose={() => setAddModal(null)}
          onAdd={item => { addItemToSub(addModal.subId, item); setAddModal(null); }}
        />
      )}
    </div>
  );
}

// ─── User Preview ─────────────────────────────────────────────────────────────
function UserPreview({ data }: { data: Category[] }) {
  const [view, setView] = useState<"categories" | "subcategories" | "items">("categories");
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);

  const accents: Record<string, string> = accentMap;

  return (
    <div className="rounded-2xl overflow-hidden pb-4" style={{ background: "#0a0703", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Preview banner */}
      <div className="flex items-center gap-2 mx-4 mt-4 px-4 py-2.5 rounded-xl" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
        <span className="text-amber-500 text-sm">👁</span>
        <p className="text-amber-400 text-xs font-semibold">User Preview — Live preview of your menu</p>
      </div>

      <div className="px-4 pt-4">
        {/* Categories */}
        {view === "categories" && (
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: "140px" }}>
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.3), rgba(10,7,3,0.95))" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/50 text-[10px] tracking-widest uppercase mb-1">Brewhaus Cafe</p>
                <p className="text-white font-bold text-xl leading-none">What are you <span style={{ color: "#f59e0b" }}>craving?</span></p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.map(cat => {
                const accent = accents[cat.id] ?? "#f59e0b";
                return (
                  <button key={cat.id} onClick={() => { setSelectedCat(cat); setView("subcategories"); }} className="relative rounded-2xl overflow-hidden text-left" style={{ aspectRatio: "3/4", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <img src={cat.bgImage} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                    <div className="absolute top-2 right-2 text-xl">{cat.icon}</div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm">{cat.name}</p>
                      <div className="mt-1.5 h-0.5 w-8 rounded-full" style={{ background: accent }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {view === "subcategories" && selectedCat && (
          <div>
            <button onClick={() => { setView("categories"); setSelectedCat(null); }} className="flex items-center gap-2 text-white/50 text-sm mb-3 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
              Back
            </button>
            <p className="text-white font-bold text-lg mb-3">{selectedCat.icon} {selectedCat.name}</p>
            <div className="grid grid-cols-2 gap-2">
              {selectedCat.subcategories.map(sub => {
                const accent = accents[selectedCat.id] ?? "#f59e0b";
                return (
                  <button key={sub.id} onClick={() => { setSelectedSub(sub); setView("items"); }} className="rounded-2xl overflow-hidden text-left p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="w-full h-20 rounded-xl overflow-hidden mb-2">
                      <img src={sub.items[0]?.image} alt={sub.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white font-semibold text-sm">{sub.icon} {sub.name}</p>
                    <p className="text-white/30 text-[10px] mt-0.5">{sub.items.length} items</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: accent }}>Explore →</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Items */}
        {view === "items" && selectedCat && selectedSub && (
          <div>
            <button onClick={() => { setView("subcategories"); setSelectedSub(null); }} className="flex items-center gap-2 text-white/50 text-sm mb-3 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
              {selectedCat.name} · {selectedSub.name}
            </button>
            <div className="grid grid-cols-2 gap-2">
              {selectedSub.items.map(item => {
                const accent = accents[selectedCat.id] ?? "#f59e0b";
                return (
                  <div key={item.id} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="relative" style={{ aspectRatio: "1/1" }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                          <span className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-white font-semibold text-xs truncate">{item.name}</p>
                      <p className="text-white/30 text-[10px] mt-0.5 line-clamp-1">{item.description}</p>
                      <p className="font-bold text-sm mt-1" style={{ color: accent }}>₱{item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [data, setData] = useState<Category[]>(menuData.map(c => ({
    ...c,
    subcategories: c.subcategories.map(s => ({
      ...s,
      items: [...s.items],
    })),
  })));
  const [tab, setTab] = useState<Tab>("products");
  const [search, setSearch] = useState("");

  const updateCategory = (idx: number, updated: Category) => {
    const next = [...data];
    next[idx] = updated;
    setData(next);
  };

  const totalItems = data.reduce((a, c) => a + c.subcategories.reduce((b, s) => b + s.items.length, 0), 0);
  const totalAvailable = data.reduce((a, c) => a + c.subcategories.reduce((b, s) => b + s.items.filter(i => i.isAvailable).length, 0), 0);

  // Filtered categories/items based on search
  const filteredData = search.trim() === "" ? data : data.map(cat => ({
    ...cat,
    subcategories: cat.subcategories.map(sub => ({
      ...sub,
      items: sub.items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(sub => sub.items.length > 0),
  })).filter(cat => cat.subcategories.length > 0);

  return (
    <div className="min-h-screen pb-20 relative" style={{ background: "#0a0703" }}>

      {/* ── Looping background video ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="https://cdn.coverr.co/videos/coverr-pouring-coffee-into-a-cup-2178/1080p.mp4"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,3,0.7) 0%, rgba(10,7,3,0.5) 50%, rgba(10,7,3,0.9) 100%)" }} />
      </div>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 px-4 pt-4 pb-4" style={{ background: "rgba(10,7,3,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,0.08)" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">☕</span>
                <span className="font-bold text-white text-base">Brew<span style={{ color: "#f59e0b" }}>haus</span></span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white" style={{ background: "#f59e0b", boxShadow: "0 2px 8px rgba(245,158,11,0.4)" }}>
                  Admin
                </span>
              </div>
              <p className="text-white/30 text-[10px] mt-0.5">
                Logged in as <span style={{ color: "#f59e0b" }} className="font-semibold">admin</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate("/admin/loginpage", { replace: true }); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/20"
            style={{ background: "rgba(255,255,255,0.08)" }}
            title="Logout"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Categories", value: data.length, color: "#f59e0b" },
            { label: "Total Items", value: totalItems, color: "#a8a29e" },
            { label: "Available", value: totalAvailable, color: "#34d399" },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-3.5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-white/30 text-[10px] font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex p-1 rounded-2xl gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {([["products", "📦 Products"], ["preview", "👁 User Preview"]] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
              style={tab === t
                ? { background: "#f59e0b", color: "#0a0703", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }
                : { color: "rgba(255,255,255,0.4)" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products tab */}
        {tab === "products" && (
          <>
            {/* Search */}
            <div className="relative">
              <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Category sections */}
            <div className="space-y-3">
              {filteredData.length === 0 ? (
                <div className="text-center py-12 text-white/20">
                  <span className="text-4xl block mb-3">🔍</span>
                  <p className="text-sm font-medium">No items found</p>
                </div>
              ) : (
                filteredData.map((cat, idx) => (
                  <CategoryPanel
                    key={cat.id}
                    cat={cat}
                    onChange={updated => {
                      const realIdx = data.findIndex(c => c.id === cat.id);
                      if (realIdx !== -1) updateCategory(realIdx, updated);
                    }}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Preview tab */}
        {tab === "preview" && <UserPreview data={data} />}
      </div>
    </div>
  );
}