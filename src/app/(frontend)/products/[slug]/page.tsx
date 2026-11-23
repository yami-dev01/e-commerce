import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { AddToCartButton } from '@/components/AddToCartButton'
import {formatPrice} from "@/lib/format"
import { populated } from '@/lib/relation'



export default async function ProductPage({ params } : { params : Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1, 
  })

  const product = docs[0]
  if (!product) notFound()

  const image = populated(product.image)

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#20201e] sm:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="flex min-h-[400px] items-center justify-center bg-[#eeece5] p-8 sm:min-h-[500px]">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              width={500}
              height={500}
              className="h-auto max-h-[450px] w-full object-contain"
            />
          )}
        </div>

        <div className="flex flex-col">
          <p className="mb-5 text-xs font-bold uppercase tracking-[3px] text-[#e56b45]">
            The collection
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-[-1.5px] sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-semibold">
            {formatPrice(product.price)}
          </p>

          <div className="my-8 border-t border-[#20201e]/10" />

          <p className={`text-sm font-medium ${product.stock! > 0 ? 'text-green-700' : 'text-red-600'}`}>
            {product.stock! > 0 ? '● In stock' : '● Out of stock'}
          </p>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#77766f]">
            A great addition to your collection. Discover the details and make it yours.
          </p>

          <div className="mt-8">
            {product.stock! > 0 && (
              <AddToCartButton productId={String(product.id)} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
