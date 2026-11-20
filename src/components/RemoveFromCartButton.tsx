'use client'

import { useState } from 'react'
import { removeFromCart } from '@/app/(frontend)/actions/carts'

export function RemoveFromCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      await removeFromCart(productId)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Removing…' : 'Remove'}
    </button>
  )
}