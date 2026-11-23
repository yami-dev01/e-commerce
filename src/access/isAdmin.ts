import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => user?.collection === 'users'