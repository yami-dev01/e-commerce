import type { CollectionBeforeValidateHook } from 'payload'

export const calculateOrder: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation !== 'create' || !data) return data

  const items = []
  let total = 0

  for (const item of data.items ?? []) {
    const productId = typeof item.product === 'object' ? item.product.id : item.product

    const product = await req.payload.findByID({
      collection: 'products',
      id: productId,
      req,
    })

    items.push({
      product: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    })
    total += product.price * item.quantity
  }

  return { ...data, items, total }
}