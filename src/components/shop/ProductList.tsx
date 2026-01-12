'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    PackageIcon,
    Tick01Icon,
    ShoppingBasket01Icon
} from '@hugeicons/core-free-icons'
import Card from '@/components/ui/Card'

interface ProductListProps {
    products: any[]
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    <Link href={`/shop/${product.id}`} className="block group">
                        <Card hover className="h-full border-b-2 border-transparent group-hover:border-shop-primary transition-all duration-500">
                            <div className="relative aspect-4/5 overflow-hidden bg-shop-bg-secondary">
                                <motion.img
                                    src={product.images[0]}
                                    alt={product.title}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm z-20 flex items-center gap-1.5">
                                    <HugeiconsIcon icon={ShoppingBasket01Icon} size={12} className="text-shop-primary" />
                                    Spec v.1.0
                                </div>
                                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500 z-10" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-shop-primary transition-colors duration-300">
                                    {product.title}
                                </h3>
                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
                                    <span className="text-xl font-black italic tracking-tighter">
                                        ${product.price}
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-shop-primary flex items-center gap-1.5">
                                        <HugeiconsIcon icon={Tick01Icon} size={12} strokeWidth={3} />
                                        In Stock
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            ))}
            {products.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-24 text-center border-2 border-dashed border-stone-200 rounded-none"
                >
                    <p className="text-stone-400 font-medium uppercase tracking-widest text-xs">Technical inventory awaiting replenishment</p>
                </motion.div>
            )}
        </motion.div>
    )
}
