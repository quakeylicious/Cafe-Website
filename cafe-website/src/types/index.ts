export interface Coffee {
  id: string;
  name: string;
  category: CoffeeCategory;
  description: string;
  price: number;
  image: string;
  tags: string[];
  isAvailable: boolean;
  featured?: boolean;
}

export type CoffeeCategory =
  | "All"
  | "Espresso"
  | "Frappe"
  | "Cold Brew"
  | "Latte"
  | "Seasonal";

export interface FavoriteItem {
  id: string;
  savedAt: string;
}