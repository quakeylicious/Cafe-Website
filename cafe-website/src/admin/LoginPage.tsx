// src/admin/LoginPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from './useAdminAuth'
import bgImage from '../assets/images/newbg.jpg'

const ADMIN_EMAIL = 'admin@brewhaus.com'
const ADMIN_PASSWORD = 'brewhaus2025'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAdminAuth()
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!form.email || !form.password) {
      setMessage('Please enter email and password')
      return
    }

    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        login()
        navigate('/admin', { replace: true })
      } else {
        setMessage('❌ Invalid email or password')
      }
    } catch (error) {
      setMessage('❌ Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative pt-10 mb-30">
        <h1 className="text-white font-serif text-5xl font-bold text-center drop-shadow-lg">
          Welcome
        </h1>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${
            message.includes('✅') ? 'text-green-600' : 'text-red-500'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
