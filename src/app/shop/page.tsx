import { prisma } from '@/lib/prisma'
import ProductList from '@/components/shop/ProductList'
import { HugeiconsIcon } from '@hugeicons/react'
import { PackageIcon } from '@hugeicons/core-free-icons'

async function getProducts() {
    console.log('[Diagnostic] Fetching products in ShopPage...')
    console.log('[Diagnostic] DATABASE_URL exists:', !!process.env.DATABASE_URL)

    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        console.log(`[Diagnostic] Successfully fetched ${products.length} products`)
        return products.map((product: any) => ({
            ...product,
            images: JSON.parse(product.images || '[]'),
        }))
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export default async function ShopPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-shop-bg pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <span className="text-shop-primary font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                        <HugeiconsIcon icon={PackageIcon} size={14} />
                        Technical Equipment
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mt-4">
                        The <span className="text-reveal-container">Collection<span className="text-reveal-overlay text-shop-primary" /></span>
                    </h1>
                </div>

                <ProductList products={products} />
            </div>
        </div>
    )
}
