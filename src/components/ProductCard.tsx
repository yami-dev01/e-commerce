
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/payload-types'

type ProductCardProps = {
  product: Product
  showCategory?: boolean
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const image = typeof product.image === 'object' && product.image !== null ? product.image : null

  const category = typeof product.category === 'object' && product.category !== null ? product.category : null

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#eeece5] p-8">
        {image?.url && (
          <Image 
            src={image.url}
            alt={image.alt ?? product.name}
            width={300}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-5">
        {showCategory && category && (
          <small className="text-xs font-semibold uppercase tracking-[2px] text-[#e56b45]">
            {category.name}
          </small>
        )}

        <h2 className="mt-2 text-lg font-semibold tracking-tight transition group-hover:text-[#e56b45]">
          {product.name}
        </h2>

        <p className="mt-2 text-base font-medium text-[#555550]">
          ₹{product.price}
        </p>
      </div>
    </Link>
  )
}
