const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
export const formatPrice = (amount: number) => inr.format(amount)