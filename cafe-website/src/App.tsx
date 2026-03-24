import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './admin/LoginPage'
import ProtectedAdmin from './admin/ProtectedAdmin'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import CoffeeDetail from './pages/CoffeeDetail'
import Favorites from './pages/Favorites'
import BottomNav from './components/BottomNav'

function AppContent() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/admin')

  return (
    <>
      {!hideNav && <BottomNav />}
      <Routes>
        <Route path="/admin/loginpage" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
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