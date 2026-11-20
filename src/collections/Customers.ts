import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    // anyone can sign up
    create: () => true,

    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
  },
  fields: [
    { name: 'name', type: 'text' },
    // customer will have cart (product and quantity)
    {
        name: 'cart',
        type: 'array',
        fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1, defaultValue: 1 },
        ],
    },
 ],
}