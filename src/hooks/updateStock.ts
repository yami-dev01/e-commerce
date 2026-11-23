import { APIError } from 'payload'
import type { CollectionBeforeChangeHook } from 'payload'

export const updateStock: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  // Only when an order is first created
  if (operation !== 'create') return data

  for (const item of data.items ?? []) {
    const productId = typeof item.product === 'object' ? item.product.id : item.product

    const product = await req.payload.findByID({
      collection: 'products',
      id: productId,
      req,
    })

    const stock = product.stock ?? 0

    if (stock < item.quantity) {
      throw new APIError(`Not enough stock for ${product.name}`, 400)
    }

    await req.payload.update({
      collection: 'products',
      id: productId,
      data: { stock: stock - item.quantity },
      req,
    })
  }

  return data
}