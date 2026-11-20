'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // payload make this /api by itself
    const res = await fetch('/api/customers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      setError('Invalid email or password')
      return
    }

    router.push('/products')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-6 py-12 text-[#20201e]">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-[-1.5px]">
            store<span className="text-[#e56b45]">.</span>
          </h1>
          <h2 className="mt-10 text-4xl font-semibold tracking-[-1.5px]">
            Welcome back.
          </h2>
          <p className="mt-3 text-sm text-[#77766f]">
            Log in to continue shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#20201e]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa89f] focus:border-[#e56b45]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#20201e]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa89f] focus:border-[#e56b45]"
            />
          </div>

          {error && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#20201e] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#e56b45]"
          >
            Log in →
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#77766f]">
          Don't have an account?{' '}
          <a href="/signup" className="font-semibold text-[#20201e] underline decoration-[#e56b45] underline-offset-4 hover:text-[#e56b45]">
            Sign up
          </a>
        </p>
      </div>
    </main>
  )
}
