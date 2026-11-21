import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers: await getHeaders() })
  const customer = user?.collection === 'customers' ? user : null

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f6f2] text-[#20201e]">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-[#20201e]/10 px-6 py-6 sm:px-12">
        <Link href="/" className="text-2xl font-black tracking-[-1.5px]">
          store<span className="text-[#e56b45]">.</span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/products"
            className="text-sm font-medium text-[#555550] transition hover:text-[#e56b45]"
          >
            Shop
          </Link>

          {customer ? (
            <>
              <Link
                href="/orders"
                className="text-sm font-medium text-[#555550] transition hover:text-[#e56b45]"
              >
                My Orders
              </Link>

              <Link
                href="/cart"
                className="bg-[#20201e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e56b45]"
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#555550] transition hover:text-[#e56b45]"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="bg-[#20201e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e56b45]"
              >
                Join us
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-8 text-xs font-bold uppercase tracking-[3px] text-[#e56b45]">
            Thoughtfully picked. Made for you.
          </p>

          {customer ? (
            <>
              <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-2.5px] sm:text-7xl">
                Good to see you
                <span className="text-[#e56b45]">
                  {customer.name ? `, ${customer.name}` : ' again'}.
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-[#77766f]">
                There is always something worth discovering. Take a look around
                and find something that catches your eye.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="bg-[#20201e] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#e56b45]"
                >
                  Explore collection →
                </Link>

                <Link
                  href="/orders"
                  className="border border-[#20201e]/20 px-7 py-4 text-sm font-semibold transition hover:border-[#e56b45] hover:text-[#e56b45]"
                >
                  View orders
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-semibold leading-[1.05] tracking-[-3px] sm:text-8xl">
                Less scrolling.
                <span className="mt-2 block text-[#e56b45]">
                  Better finding.
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-[#77766f]">
                Good products don't need complicated introductions. Explore
                our collection, find what you love, and make it yours.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <Link
                  href="/products"
                  className="bg-[#20201e] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#e56b45]"
                >
                  Shop the collection →
                </Link>

                <Link
                  href="/signup"
                  className="text-sm font-semibold underline decoration-[#e56b45] underline-offset-8 transition hover:text-[#e56b45]"
                >
                  Create an account
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#20201e]/10 px-6 py-7 text-xs text-[#77766f] sm:flex-row sm:px-12">
        <span className="font-bold tracking-[-0.5px] text-[#20201e]">
          store.
        </span>
        <span>
          © {new Date().getFullYear()} Store. Made for everyday living.
        </span>
      </footer>
    </main>
  )
}