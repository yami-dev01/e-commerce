'use server'

import { headers as getHeaders } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function addToCart(productId: string) {
  const payload = await getPayload({ config })

  // login check
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user || user.collection !== 'customers') {
    return { error: 'Please log in first' }
  }

  // product in stock
  const product = await payload.findByID({ collection: 'products', id: productId })
  if (!product || product.stock! <= 0) {
    return { error: 'Product unavailable' }
  }

  // make the new cart
  const cart = (user.cart ?? []).map((row) => ({
    product: typeof row.product === 'object' ? row.product.id : row.product,
    quantity: row.quantity,
  }))

  const existing = cart.find((row) => String(row.product) === String(productId))
  if (existing) {
    existing.quantity += 1
  } else {
    const id = Number(productId)
    cart.push({ product: id, quantity: 1 })
  }

  // save 
  await payload.update({
    collection: 'customers',
    id: user.id,
    data: { cart },
  })

  return { ok: true }
}


export async function removeFromCart(productId: string) {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user || user.collection !== 'customers') {
    return { error: 'Please log in first' }
  }

  // delete
  const cart = (user.cart ?? [])
    .map((row) => ({
      product: typeof row.product === 'object' ? row.product.id : row.product,
      quantity: row.quantity,
    }))
    .filter((row) => String(row.product) !== String(productId))
  
  await payload.update({
    collection: 'customers',
    id: user.id,
    data: { cart },
  })

  revalidatePath('/cart')
  return { ok: true }
}



export async function placeOrder() {
  const payload = await getPayload({ config })

  // login check
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user || user.collection !== 'customers') {
    return { error: 'Please log in first' }
  }

  const customer = await payload.findByID({
    collection: 'customers',
    id: user.id,
    depth: 1,
  })

  const products = (customer.cart ?? []).filter((row) => typeof row.product === 'object')

  if (products.length === 0) {
    return { error: 'Your cart is empty' }
  }

  const items = []
  let total = 0

  for (const product of products) {
    const currProduct = product.product as Exclude<typeof product.product, string | number>

    if (currProduct.stock! < product.quantity) {
      return { error: `Not enough stock for ${currProduct.name}` }
    }

    items.push({
      product: currProduct.id,
      name: currProduct.name,
      price: currProduct.price,
      quantity: product.quantity,
    })
    total += currProduct.price * product.quantity
  }

  // order create
  const order = await payload.create({
    collection: 'orders',
    data: {
      customer: user.id,
      items,
      total,
      status: 'pending',
    },
  })

  // empty cart
  await payload.update({
    collection: 'customers',
    id: user.id,
    data: { cart: [] },
  })

  return { ok: true, orderId: order.id }
}