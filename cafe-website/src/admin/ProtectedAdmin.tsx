import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'
import AdminPanel from './AdminPanel'

export default function ProtectedAdmin() {
  const navigate = useNavigate()
  const { isAuthed } = useAdminAuth()

  useEffect(() => {
    if (!isAuthed()) navigate('/admin/loginpage', { replace: true })
  }, [])

  if (!isAuthed()) return null
  return <AdminPanel />
}