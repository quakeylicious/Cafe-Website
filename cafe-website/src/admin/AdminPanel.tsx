// src/admin/AdminPanel.tsx

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { coffeeData as initialData, categories } from "../data/coffeeData";
import type { Coffee } from "../types";
import { useAdminAuth } from "./useAdminAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "products" | "preview";
type EditField = "name" | "price" | "description" | "isAvailable" | "category" | "tags";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const blankCoffee = (): Coffee => ({
  id: generateId(),
  name: "",
  category: "Espresso",
  description: "",
  price: 0,
  image: "",
  tags: [],
  isAvailable: true,
  featured: false,
});

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all";
const labelCls =
  "text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1";

// ─── ProductRow ───────────────────────────────────────────────────────────────
function ProductRow({
  coffee,
  onChange,
  onDelete,
}: {
  coffee: Coffee;
  onChange: (updated: Coffee) => void;
  onDelete: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);

  const set = (field: EditField, value: unknown) =>
    onChange({ ...coffee, [field]: value });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({ ...coffee, image: url });
  };

  const handleTagInput = (raw: string) => {
    const tags = raw.split(",").map((t) => t.trim()).filter(Boolean);
    set("tags", tags);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden transition-all duration-200 ${
        expanded ? "ring-2 ring-amber-300" : ""
      }`}
    >
      {/* Collapsed row */}
      <div
        className="flex items-center gap-3 p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Image thumb */}
        <div className="relative shrink-0">
          <img
            src={
              coffee.image ||
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=60"
            }
            alt={coffee.name}
            className="w-14 h-14 rounded-xl object-cover border border-stone-100"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current?.click();
            }}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md hover:bg-amber-600 transition-colors"
            title="Change photo"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Name + category */}
        <div className="flex-1 min-w-0">
          <p className="text-stone-800 font-semibold text-sm truncate">
            {coffee.name || "Untitled Product"}
          </p>
          <p className="text-amber-600 text-xs font-medium">{coffee.category}</p>
        </div>

        {/* Price */}
        <p className="text-stone-700 font-bold text-sm shrink-0">₱{coffee.price}</p>

        {/* Availability pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            set("isAvailable", !coffee.isAvailable);
          }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 ${
            coffee.isAvailable
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-stone-100 text-stone-400 border border-stone-200"
          }`}
        >
          {coffee.isAvailable ? "Available" : "Unavailable"}
        </button>

        {/* Expand arrow */}
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-stone-300 shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Expanded edit form */}
      {expanded && (
        <div className="border-t border-stone-100 px-4 pb-4 pt-3 space-y-3 bg-stone-50/50">

          {/* Name */}
          <div>
            <label className={labelCls}>Product Name</label>
            <input
              type="text"
              value={coffee.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
              placeholder="Product name"
            />
          </div>

          {/* Price — big and obvious */}
          <div>
            <label className={labelCls}>Price (₱)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold text-base">
                ₱
              </span>
              <input
                type="number"
                value={coffee.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="w-full bg-white border-2 border-amber-300 rounded-xl pl-8 pr-3 py-2.5 text-lg font-bold text-amber-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all"
                placeholder="0"
                min={0}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category</label>
            <select
              value={coffee.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputCls}
            >
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              value={coffee.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="Describe this drink..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input
              type="text"
              value={coffee.tags.join(", ")}
              onChange={(e) => handleTagInput(e.target.value)}
              className={inputCls}
              placeholder="e.g. sweet, cold, trending"
            />
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-stone-200">
            <div>
              <p className="text-xs font-semibold text-stone-600">Featured on Home</p>
              <p className="text-[10px] text-stone-400">Shows in the featured carousel</p>
            </div>
            <button
              onClick={() => onChange({ ...coffee, featured: !coffee.featured })}
              className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                coffee.featured ? "bg-amber-500" : "bg-stone-200"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                  coffee.featured ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Delete */}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={onDelete}
              className="text-red-400 text-xs font-semibold flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
              Remove this product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── User Preview ─────────────────────────────────────────────────────────────
function UserPreview({ products }: { products: Coffee[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-amber-50 rounded-2xl overflow-hidden pb-6">
      {/* Preview banner */}
      <div className="bg-amber-500/10 border border-amber-300 rounded-xl mx-4 mt-4 px-4 py-2.5 flex items-center gap-2">
        <span className="text-amber-600 text-sm">👁</span>
        <p className="text-amber-700 text-xs font-semibold">
          User Preview — This is how customers see your menu
        </p>
      </div>

      {/* Menu header */}
      <div className="bg-white border-b border-stone-100 px-4 pt-5 pb-4 mt-3">
        <h1 className="text-stone-800 font-bold text-xl mb-1">Our Menu</h1>
        <p className="text-stone-400 text-xs mb-3">
          {products.length} drinks crafted for you
        </p>

        {/* Search */}
        <div className="relative mb-3">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search drinks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-9 pr-4 py-2 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-2 overflow-x-auto -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-stone-500 border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-stone-400">
            <span className="text-4xl block mb-2">☕</span>
            <p className="text-sm font-medium">Nothing found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((coffee) => (
              <div
                key={coffee.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
              >
                <div className="relative">
                  <img
                    src={
                      coffee.image ||
                      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=60"
                    }
                    alt={coffee.name}
                    className="w-full h-36 object-cover"
                  />
                  {!coffee.isAvailable && (
                    <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center">
                      <span className="bg-stone-800 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Unavailable
                      </span>
                    </div>
                  )}
                  {coffee.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-medium text-amber-600 uppercase tracking-widest">
                    {coffee.category}
                  </span>
                  <h3 className="text-stone-800 font-semibold text-sm mt-0.5 leading-tight truncate">
                    {coffee.name || "Untitled"}
                  </h3>
                  <p className="text-stone-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {coffee.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-amber-700 font-bold text-sm">
                      ₱{coffee.price}
                    </span>
                    <div className="flex gap-1">
                      {coffee.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-amber-50 text-amber-600 border border-amber-100 px-1.5 py-0.5 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (coffee: Coffee) => void;
}) {
  const [form, setForm] = useState(blankCoffee());
  const [imagePreview, setImagePreview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, image: url }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Please enter a product name.");
      return;
    }
    if (!form.price || form.price <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
    onAdd({ ...form, tags, id: generateId() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-stone-100">
          <div>
            <h2 className="text-stone-800 font-bold text-lg">New Product</h2>
            <p className="text-stone-400 text-xs mt-0.5">
              Add a new item to your menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-stone-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Image upload */}
          <div>
            <label className={labelCls}>Product Photo</label>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full h-36 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 hover:border-amber-400 hover:bg-amber-50 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden relative"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-stone-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <p className="text-stone-400 text-xs font-medium">
                    Tap to add photo
                  </p>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <button
                onClick={() => {
                  setImagePreview("");
                  setForm((f) => ({ ...f, image: "" }));
                }}
                className="text-xs text-stone-400 mt-1 hover:text-red-400 transition-colors"
              >
                Remove photo
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label className={labelCls}>Product Name *</label>
            <input
              type="text"
              placeholder="e.g. Ube Latte"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls}
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>Price (₱) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold text-base">
                ₱
              </span>
              <input
                type="number"
                placeholder="0"
                value={form.price || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                className="w-full bg-white border-2 border-amber-300 rounded-xl pl-8 pr-3 py-2.5 text-lg font-bold text-amber-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all"
                min={0}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as Coffee["category"],
                }))
              }
              className={inputCls}
            >
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              placeholder="Describe this drink..."
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. sweet, ube, cold"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-stone-700">Available</p>
                <p className="text-[10px] text-stone-400">Visible to customers</p>
              </div>
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, isAvailable: !f.isAvailable }))
                }
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                  form.isAvailable ? "bg-emerald-500" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                    form.isAvailable ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-stone-700">Featured</p>
                <p className="text-[10px] text-stone-400">Show in home carousel</p>
              </div>
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, featured: !f.featured }))
                }
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                  form.featured ? "bg-amber-500" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                    form.featured ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-500 text-sm font-semibold hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-2xl bg-amber-600 text-white text-sm font-semibold shadow-lg shadow-amber-600/25 hover:bg-amber-700 transition-colors active:scale-95"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [products, setProducts] = useState<Coffee[]>([...initialData]);
  const [tab, setTab] = useState<Tab>("products");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchAdmin, setSearchAdmin] = useState("");

  const updateProduct = (id: string, updated: Coffee) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));

  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const addProduct = (coffee: Coffee) =>
    setProducts((prev) => [...prev, coffee]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      p.category.toLowerCase().includes(searchAdmin.toLowerCase())
  );

  const available = products.filter((p) => p.isAvailable).length;
  const unavailable = products.length - available;

  return (
    <div className="min-h-screen bg-stone-100 pb-20">

      {/* ── Top bar ── */}
      <div className="bg-stone-900 text-white px-4 pt-4 pb-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">

          {/* Left: back + branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-8 h-8 rounded-xl bg-stone-700 flex items-center justify-center hover:bg-stone-600 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">☕</span>
                <span className="font-bold text-white text-base">
                  Brew<span className="text-amber-400">haus</span>
                </span>
                <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-amber-400/40">
                  Admin
                </span>
              </div>
              <p className="text-stone-400 text-[10px] mt-0.5">
                Logged in as{" "}
                <span className="text-amber-400 font-semibold">admin</span>
              </p>
            </div>
          </div>

          {/* Right: new product + logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 transition-colors text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-amber-500/30 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Product
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/admin/login", { replace: true });
              }}
              className="w-8 h-8 rounded-xl bg-stone-700 hover:bg-red-500/80 transition-colors flex items-center justify-center"
              title="Logout"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Items", value: products.length, color: "text-stone-700", bg: "bg-white" },
            { label: "Available", value: available, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Unavailable", value: unavailable, color: "text-red-400", bg: "bg-red-50" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-3.5 text-center shadow-sm border border-stone-100`}
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-stone-400 text-[10px] font-medium mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 border border-stone-100 shadow-sm gap-1">
          {(
            [
              ["products", "📦 Products"],
              ["preview", "👁 User Preview"],
            ] as [Tab, string][]
          ).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                tab === t
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-400 hover:text-stone-700"
              }`}
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
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchAdmin}
                onChange={(e) => setSearchAdmin(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 shadow-sm"
              />
            </div>

            {/* Product list */}
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <span className="text-4xl block mb-3">🔍</span>
                  <p className="text-sm font-medium">No products found</p>
                </div>
              ) : (
                filtered.map((coffee) => (
                  <ProductRow
                    key={coffee.id}
                    coffee={coffee}
                    onChange={(updated) => updateProduct(coffee.id, updated)}
                    onDelete={() => deleteProduct(coffee.id)}
                  />
                ))
              )}
            </div>

            {/* Add new dashed button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full py-3.5 rounded-2xl border-2 border-dashed border-stone-300 text-stone-400 text-sm font-semibold flex items-center justify-center gap-2 hover:border-amber-400 hover:text-amber-500 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add new product
            </button>
          </>
        )}

        {/* Preview tab */}
        {tab === "preview" && <UserPreview products={products} />}
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={addProduct}
        />
      )}
    </div>
  );
}