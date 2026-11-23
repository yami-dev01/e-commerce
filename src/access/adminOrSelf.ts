import type { Access } from 'payload'

export const adminOrSelf = (field: string = 'id'): Access => ({ req: { user } }) => {
    if (!user) return false
    if (user.collection === 'users') return true
    return { [field]: { equals: user.id } }
}