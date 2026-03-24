import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import CoffeeDetail from './pages/CoffeeDetail'
import Favorites from './pages/Favorites'
import BottomNav from './components/BottomNav'

function AppContent() {
  const location = useLocation()

  // hide navbar on login page
  const hideNav = location.pathname === '/loginpage'

  return (
    <>
      {!hideNav && <BottomNav />}

      <Routes>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<CoffeeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}