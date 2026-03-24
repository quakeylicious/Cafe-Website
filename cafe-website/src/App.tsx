import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import CoffeeDetail from "./pages/CoffeeDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <BottomNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<CoffeeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}