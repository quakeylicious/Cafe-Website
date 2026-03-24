export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgImage: string;
  subcategories: SubCategory[];
}

export const menuData: Category[] = [
  {
    id: "drinks",
    name: "Drinks",
    icon: "☕",
    color: "from-amber-800 to-amber-600",
    bgImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    subcategories: [
      {
        id: "coffee",
        name: "Coffee",
        icon: "☕",
        items: [
          { id: "d1", name: "Classic Americano", description: "Bold espresso shots with hot water. Simple, honest, deeply satisfying.", price: 120, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80", isAvailable: true },
          { id: "d2", name: "Cappuccino", description: "Equal parts espresso, steamed milk, and thick foam.", price: 145, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80", isAvailable: true },
          { id: "d3", name: "Caramel Macchiato", description: "Layered espresso and vanilla syrup with a golden caramel drizzle.", price: 175, image: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=400&q=80", isAvailable: true },
          { id: "d4", name: "Mocha Frappe", description: "Blended espresso, chocolate, milk and ice topped with whipped cream.", price: 195, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "fruit-tea",
        name: "Fruit Tea",
        icon: "🍓",
        items: [
          { id: "d5", name: "Strawberry Burst", description: "Fresh strawberry puree with iced jasmine tea and lychee jelly.", price: 135, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", isAvailable: true },
          { id: "d6", name: "Mango Passion", description: "Tropical mango and passionfruit blended with chilled green tea.", price: 140, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80", isAvailable: true },
          { id: "d7", name: "Lychee Rose", description: "Delicate lychee with rose syrup over sparkling tea.", price: 150, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "milk-tea",
        name: "Milk Tea",
        icon: "🧋",
        items: [
          { id: "d8", name: "Classic Pearl Milk Tea", description: "Silky black tea with creamy milk and chewy tapioca pearls.", price: 130, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", isAvailable: true },
          { id: "d9", name: "Taro Milk Tea", description: "Earthy, sweet taro blended with milk tea and pearls.", price: 145, image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&q=80", isAvailable: true },
          { id: "d10", name: "Matcha Latte", description: "Ceremonial grade matcha whisked with steamed oat milk.", price: 160, image: "https://images.unsplash.com/photo-1515823662972-da6a2ab5174b?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        icon: "🧊",
        items: [
          { id: "d11", name: "Classic Cold Brew", description: "Steeped 18 hours for a naturally sweet, incredibly smooth concentrate.", price: 165, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80", isAvailable: true },
          { id: "d12", name: "Salted Caramel Cold Brew", description: "Cold brew with house-made salted caramel and fresh cream.", price: 185, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "meals",
    name: "Meals",
    icon: "🍽️",
    color: "from-orange-700 to-red-500",
    bgImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    subcategories: [
      {
        id: "rice-meals",
        name: "Rice Meals",
        icon: "🍱",
        items: [
          { id: "m1", name: "Garlic Butter Chicken Rice", description: "Juicy grilled chicken thigh over garlic butter fried rice with atchara.", price: 220, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", isAvailable: true },
          { id: "m2", name: "Pork Sisig Rice Bowl", description: "Sizzling pork sisig served over steamed rice with a fried egg.", price: 235, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", isAvailable: true },
          { id: "m3", name: "Tuna Flakes Rice", description: "Seasoned tuna flakes sautéed with vegetables over hot rice.", price: 185, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "pasta",
        name: "Pasta",
        icon: "🍝",
        items: [
          { id: "m4", name: "Creamy Carbonara", description: "Al dente pasta in a rich egg and parmesan cream sauce with crispy bacon.", price: 210, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80", isAvailable: true },
          { id: "m5", name: "Filipino Spaghetti", description: "Sweet-style tomato pasta with banana ketchup, hotdogs, and ground meat.", price: 185, image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "sandwiches",
        name: "Sandwiches",
        icon: "🥪",
        items: [
          { id: "m6", name: "Grilled Cheese Club", description: "Triple-decker grilled sandwich with ham, cheese, and fresh tomato.", price: 165, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80", isAvailable: true },
          { id: "m7", name: "Chicken Pesto Panini", description: "Toasted panini with grilled chicken, basil pesto, and mozzarella.", price: 195, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    color: "from-pink-600 to-rose-400",
    bgImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    subcategories: [
      {
        id: "cakes",
        name: "Cakes",
        icon: "🎂",
        items: [
          { id: "des1", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.", price: 195, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80", isAvailable: true },
          { id: "des2", name: "Basque Burnt Cheesecake", description: "Rustic caramelized cheesecake with a creamy, custardy center.", price: 175, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", isAvailable: true },
          { id: "des3", name: "Ube Halaya Cake", description: "Layered purple yam cake with ube halaya frosting and macapuno.", price: 185, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "ice-cream",
        name: "Ice Cream",
        icon: "🍨",
        items: [
          { id: "des4", name: "Dirty Kitchen Sundae", description: "Two scoops of vanilla ice cream with caramel, nuts, and whipped cream.", price: 145, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", isAvailable: true },
          { id: "des5", name: "Halo-Halo", description: "Filipino shaved ice with ube, leche flan, beans, and mixed fruits.", price: 165, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: "🍟",
    color: "from-yellow-600 to-amber-400",
    bgImage: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80",
    subcategories: [
      {
        id: "pastries",
        name: "Pastries",
        icon: "🥐",
        items: [
          { id: "s1", name: "Butter Croissant", description: "Flaky, golden-layered croissant baked fresh every morning.", price: 85, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", isAvailable: true },
          { id: "s2", name: "Cheese Ensaymada", description: "Soft, buttery Filipino brioche topped with buttercream and sharp cheese.", price: 75, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", isAvailable: true },
          { id: "s3", name: "Cinnamon Roll", description: "Soft-baked roll with cinnamon sugar swirl and cream cheese glaze.", price: 110, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "fries-sides",
        name: "Fries & Sides",
        icon: "🍟",
        items: [
          { id: "s4", name: "Loaded Cheese Fries", description: "Crispy fries smothered in cheddar cheese sauce with bacon bits.", price: 135, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", isAvailable: true },
          { id: "s5", name: "Garlic Parmesan Fries", description: "Golden fries tossed in garlic butter and shaved parmesan.", price: 125, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "combos",
    name: "Combos",
    icon: "🎁",
    color: "from-emerald-700 to-teal-500",
    bgImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    subcategories: [
      {
        id: "value-sets",
        name: "Value Sets",
        icon: "💰",
        items: [
          { id: "c1", name: "Coffee + Pastry Set", description: "Any regular coffee paired with your choice of croissant or ensaymada.", price: 175, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", isAvailable: true },
          { id: "c2", name: "Meal + Drink Set", description: "Any rice meal paired with a regular-sized drink of your choice.", price: 280, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", isAvailable: true },
          { id: "c3", name: "Snack + Cold Brew", description: "Loaded fries or garlic fries with a classic cold brew.", price: 255, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80", isAvailable: true },
        ],
      },
      {
        id: "family-deals",
        name: "Family Deals",
        icon: "👨‍👩‍👧",
        items: [
          { id: "c4", name: "Family Platter A", description: "3 rice meals, 2 pasta, 4 drinks — perfect for a group of 4 to 5.", price: 980, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", isAvailable: true },
          { id: "c5", name: "Dessert Bundle", description: "2 cakes, 2 ice cream desserts, and 2 cold drinks for sharing.", price: 650, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", isAvailable: true },
        ],
      },
    ],
  },
];