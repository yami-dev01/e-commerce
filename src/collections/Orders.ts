import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: { useAsTitle: 'id', defaultColumns: ['id', 'customer', 'total', 'status'] },
  access: {
    create: ({ req: { user } }) => user?.collection === 'users',
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user) return { customer: { equals: user.id } }
      return false
    },
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    { name: 'customer', type: 'relationship', relationTo: 'customers', required: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1 },
      ],
    },
    { name: 'total', type: 'number', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}