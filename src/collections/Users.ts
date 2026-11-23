import type { Access, CollectionConfig } from 'payload'

// true only when the logged-in person is from the "users" collection (an admin)
const isAdmin: Access = ({ req: { user } }) => user?.collection === 'users'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}