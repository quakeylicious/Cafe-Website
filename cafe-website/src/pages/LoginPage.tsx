// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import bgImage from '../assets/images/newbg.jpg'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!form.email || !form.password) {
      setMessage('Please enter email and password')
      return
    }

    if (!validateEmail(form.email)) {
      setMessage('Invalid email format')
      return
    }

    try {
      setLoading(true)

      // 🔥 READY FOR BACKEND (Laravel API)
      // Replace with your API URL later
      /*
      const res = await fetch('https://your-api-url/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      */

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage(`✅ Logged in as ${form.email}`)
    } catch (error) {
      setMessage('❌ Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start "
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >

      {/* Content */}
      <div className="relative pt-10 mb-30">
        <h1 className="text-white font-serif text-5xl font-bold text-center drop-shadow-lg">
          Welcome
        </h1>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Password */}
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

              {/* Show/Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${message.includes('✅')
              ? 'text-green-600'
              : 'text-red-500'
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}