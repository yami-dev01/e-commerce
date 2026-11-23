import type { CollectionConfig } from 'payload'
import { anyone } from '../access/isPublic'
import { adminOrSelf } from '../access/adminOrSelf'
import { isAdmin } from '../access/isAdmin'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    create: anyone, // anyone can sign up
    read: adminOrSelf(),
    update: adminOrSelf(),
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
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