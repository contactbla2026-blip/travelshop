import ProductDetailClient from '@/components/shop/ProductDetailClient'
import { prisma } from '@/lib/prisma'

async function getProductData(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        })

        if (!product) return null

        const relatedProducts = await prisma.product.findMany({
            where: {
                id: { not: id },
            },
            take: 4,
        })

        return {
            product: {
                ...product,
                images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
            },
            relatedProducts: relatedProducts.map((p: any) => ({
                ...p,
                images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
            })),
        }
    } catch (error) {
        console.error('Error fetching product data:', error)
        return null
    }
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const data = await getProductData(params.id)

    if (!data) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h1 className="text-2xl font-black uppercase tracking-widest italic">Product not found</h1>
                <p className="text-stone-500 mt-2">The engineering specs for this item are unavailable.</p>
            </div>
        )
    }

    return <ProductDetailClient product={data.product} relatedProducts={data.relatedProducts} />
}
