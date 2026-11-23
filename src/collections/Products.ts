import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true, // anyone can view products
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'richText' },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'stock', type: 'number', required: true,defaultValue: 0 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
  ],
}