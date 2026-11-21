import Link from 'next/link'
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton'
import { PlaceOrderButton } from '@/components/PlaceOrderButton'
import { getPayloadClient, requireCustomer } from '@/lib/payload'
import { formatPrice } from '@/lib/format'

export default async function CartPage() {
  const user = await requireCustomer()
  const payload = await getPayloadClient()

  // depth 1 will include the cart 
  const customer = await payload.findByID({
    collection: 'customers',
    id: user.id,
    depth: 1,
  })

  const productsInCart = customer.cart ?? []

  if (productsInCart.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f6f2] px-6 text-center text-[#20201e]">
        <h1 className="text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          Your cart<span className="text-[#e56b45]">.</span>
        </h1>
        <p className="mt-4 text-base text-[#77766f]">
          Your cart is empty. Looks like you haven't found your favourites yet.
        </p>
        <Link
          href="/products"
          className="mt-8 bg-[#20201e] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#e56b45]"
        >
          Browse products →
        </Link>
      </main>
    )
  }

  let total = 0

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#20201e] sm:px-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          Your cart<span className="text-[#e56b45]">.</span>
        </h1>
        <p className="mt-3 text-sm text-[#77766f]">
          Review your items before placing your order.
        </p>

        <div className="mt-10 border-t border-[#20201e]/10">
          {productsInCart.map((currProduct) => {
            // product is an object only when it was loaded (depth: 1)
            if (typeof currProduct.product !== 'object') return null
            const product = currProduct.product
            total += product.price * currProduct.quantity

            return (
              <div key={currProduct.id} className="flex flex-col justify-between gap-4 border-b border-[#20201e]/10 py-7 sm:flex-row sm:items-center">
                <div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-lg font-semibold transition hover:text-[#e56b45]"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2 text-sm text-[#77766f]">
                    {currProduct.quantity} × ${formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-semibold">
                    ${(product.price * currProduct.quantity).toFixed(2)}
                  </p>
                  <RemoveFromCartButton productId={String(product.id)} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="ml-auto mt-10 max-w-sm">
          <div className="flex items-center justify-between border-b border-[#20201e]/10 pb-5">
            <span className="text-sm text-[#77766f]">Subtotal</span>
            <span className="text-xl font-semibold">${total.toFixed(2)}</span>
          </div>
          <p className="mt-4 text-xs text-[#77766f]">
            Shipping and additional charges, if any, will be calculated at checkout.
          </p>
          <div className="mt-8">
            <PlaceOrderButton />
          </div>
          <Link
            href="/products"
            className="mt-5 block text-center text-sm font-medium text-[#77766f] transition hover:text-[#e56b45]"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
