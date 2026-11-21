
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Find the category by its slug
  const { docs } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = docs[0]

  if (!category) notFound()

  // Find products belonging to this category
  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category.id,
      },
    },
    depth: 1,
  })

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#20201e] sm:px-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="text-sm text-[#77766f] transition hover:text-[#e56b45]"
        >
          ← All products
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-[-1.5px] sm:text-5xl">
          {category.name}
          <span className="text-[#e56b45]">.</span>
        </h1>

        <p className="mt-3 text-sm text-[#77766f]">
          Explore products in this collection.
        </p>

        {products.length === 0 && (
          <p className="mt-12 text-base text-[#77766f]">
            No products in this category yet.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showCategory={false}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
