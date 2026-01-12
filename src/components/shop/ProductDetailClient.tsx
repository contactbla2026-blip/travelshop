'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    WeightIcon,
    Time02Icon,
    Calendar01Icon,
    Shield01Icon,
    PlusSignIcon,
    MinusSignIcon,
    Tick01Icon,
    ShoppingBasket01Icon,
    ArrowRight01Icon
} from '@hugeicons/core-free-icons'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useCart } from '@/components/shop/CartContext'
import { cn } from '@/lib/utils'

interface ProductDetailClientProps {
    product: any
    relatedProducts?: any[]
}

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
    const router = useRouter()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const [activeImage, setActiveImage] = useState(0)

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const handleBuyNow = () => {
        addToCart(product, quantity)
        router.push('/cart')
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-24 font-sans text-stone-900">
            <div className="container mx-auto px-6">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                    >
                        <div className="aspect-4/5 bg-stone-50 overflow-hidden relative group border border-stone-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={product.images[activeImage]}
                                    alt={product.title}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm z-20 flex items-center gap-2">
                                <HugeiconsIcon icon={ShoppingBasket01Icon} size={14} className="text-shop-primary" />
                                Engineering Sample v.1
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveImage(i)}
                                    className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-shop-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.title} ${i}`} className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-12"
                        >
                            <span className="text-shop-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Product Specifications</span>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6 leading-none">
                                {product.title}
                            </h1>
                            <div className="flex items-center space-x-6">
                                <span className="text-4xl font-black italic tracking-tighter">${product.price.toLocaleString()}</span>
                                <div className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                    <HugeiconsIcon icon={Tick01Icon} size={12} className="text-shop-primary" />
                                    {product.inventory > 0 ? 'Certified Available' : 'Waitlisted'}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-12 prose prose-stone"
                        >
                            <p className="text-stone-500 leading-relaxed font-medium capitalize">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* Specs Table */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12 border-t border-stone-100 pt-12"
                        >
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={ShoppingBasket01Icon} size={14} />
                                    Material
                                </span>
                                <span className="text-sm font-bold uppercase">Aerospace Carbon v4</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={WeightIcon} size={14} />
                                    Weight
                                </span>
                                <span className="text-sm font-bold uppercase">8.2kg Net</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={Time02Icon} size={14} />
                                    Batch
                                </span>
                                <span className="text-sm font-bold uppercase">Limited Production</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={Shield01Icon} size={14} />
                                    Warranty
                                </span>
                                <span className="text-sm font-bold uppercase">5 Year Elite Guard</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                        >
                            <div className="flex border-2 border-stone-900 items-center">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-6 py-4 hover:bg-stone-100 transition-colors uppercase font-black"
                                >
                                    <HugeiconsIcon icon={MinusSignIcon} size={14} strokeWidth={3} />
                                </button>
                                <span className="px-8 font-black text-xl w-16 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-6 py-4 hover:bg-stone-100 transition-colors uppercase font-black"
                                >
                                    <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={3} />
                                </button>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1 w-full py-8 text-sm font-black uppercase tracking-widest shadow-2xl shadow-red-200 group"
                                onClick={handleAddToCart}
                            >
                                <span className="flex items-center justify-center gap-3">
                                    {added ? 'Successfully Reserved' : 'Add to Collective Bag'}
                                    {added && <HugeiconsIcon icon={Tick01Icon} size={18} strokeWidth={3} />}
                                </span>
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-32 pt-32 border-t border-stone-100"
                    >
                        <div className="flex items-end justify-between mb-16 px-4">
                            <div>
                                <span className="text-shop-primary font-black uppercase tracking-[0.4em] text-[10px]">Cross Reference</span>
                                <h2 className="text-4xl font-black uppercase tracking-tighter italic mt-2">Related <span className="text-reveal-container">Equipment<span className="text-reveal-overlay text-shop-primary" /></span></h2>
                            </div>
                            <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-stone-900 pb-1 hover:text-shop-primary hover:border-shop-primary transition-all flex items-center gap-2">
                                View Entire Collection
                                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p: any) => (
                                <Link key={p.id} href={`/shop/${p.id}`} className="group">
                                    <Card hover>
                                        <div className="aspect-4/5 overflow-hidden bg-stone-50">
                                            <motion.img
                                                src={p.images[0]}
                                                alt={p.title}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.7 }}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest group-hover:text-shop-primary transition-colors">{p.title}</h3>
                                            <p className="text-lg font-black italic tracking-tighter mt-4">${p.price}</p>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
