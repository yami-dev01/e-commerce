import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function OrdersPage() {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user || user.collection !== 'customers') redirect('/login')

  const { docs: orders } = await payload.find({
    collection: 'orders',
    user,
    overrideAccess: false, // apply the read rules we wrote on Orders
    sort: '-createdAt', // newest first
  })

  if (orders.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f6f2] px-6 text-center text-[#20201e]">
        <h1 className="text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          Your orders<span className="text-[#e56b45]">.</span>
        </h1>
        <p className="mt-4 text-base text-[#77766f]">
          No orders yet. Your next favourite might be waiting for you.
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

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#20201e] sm:px-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          Your orders<span className="text-[#e56b45]">.</span>
        </h1>
        <p className="mt-3 text-sm text-[#77766f]">
          Keep track of your purchases and order details.
        </p>

        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-[#20201e]/10 bg-white/50 p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-[#20201e]/10 pb-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order {String(order.id).slice(-6)}
                  </h2>
                  <p className="mt-1 text-sm text-[#77766f]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="w-fit bg-[#eeece5] px-3 py-1.5 text-xs font-medium capitalize text-[#77766f]">
                  {order.status}
                </span>
              </div>

              <div className="space-y-4 py-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-xs text-[#77766f]">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[#20201e]/10 pt-5">
                <span className="text-sm text-[#77766f]">Order total</span>
                <span className="text-xl font-semibold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/products"
          className="mt-8 inline-block text-sm font-medium text-[#77766f] transition hover:text-[#e56b45]"
        >
          ← Continue shopping
        </Link>
      </div>
    </main>
  )
}