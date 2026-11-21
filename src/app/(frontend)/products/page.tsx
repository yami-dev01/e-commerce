
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'name',
  })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 12,
    depth: 1,
  })

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#20201e] sm:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          Products<span className="text-[#e56b45]">.</span>
        </h1>

        <p className="mt-3 text-sm text-[#77766f]">
          Explore our collection and find something you love.
        </p>

        <nav className="mt-10 mb-12 flex flex-wrap gap-6 border-b border-[#20201e]/10 pb-5">
          <Link
            href="/products"
            className="text-sm font-semibold text-[#e56b45]"
          >
            All
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-[#77766f] transition hover:text-[#e56b45]"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
