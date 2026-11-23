import type { CollectionAfterChangeHook } from 'payload'

export const clearCart: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  // Only when an order is first created
  if (operation !== 'create') return doc

  const customerId = typeof doc.customer === 'object' ? doc.customer.id : doc.customer

  await req.payload.update({
    collection: 'customers',
    id: customerId,
    data: { cart: [] },
    req,
  })

  return doc
}