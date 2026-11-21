'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { placeOrder } from '@/app/(frontend)/actions/carts'

export function PlaceOrderButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')

    try {
      const result = await placeOrder()

      if (result.error) {
        setError(result.error)
        return
      }

      router.push('/orders')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Placing order…' : 'Place order'}
      </button>
      {error && <p>{error}</p>}
    </>
  )
}