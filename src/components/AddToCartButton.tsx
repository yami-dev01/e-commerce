'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/app/(frontend)/actions/carts'

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleClick() {
    setLoading(true)
    setMessage('')

    try {
      const result = await addToCart(productId)

      if (result.error === 'Please log in first') {
        router.push('/login')
        return
      }

      setMessage(result.error ?? 'Added to cart!')
    } catch(e){
        console.log(e)
    }finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Adding…' : 'Add to cart'}
      </button>
      {message && <p>{message}</p>}
    </>
  )
}