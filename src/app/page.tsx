'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    ZapIcon,
    GlobeIcon,
    Shield01Icon
} from '@hugeicons/core-free-icons'
import Button from '@/components/ui/Button'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Split Hero Section */}
            <div className="relative h-screen flex flex-col md:flex-row overflow-hidden">
                {/* Shop Hero (Technical/Left) */}
                <Link
                    href="/shop"
                    className="relative flex-1 group overflow-hidden border-r border-white/10"
                >
                    <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200")' }}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-stone-900 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                    <div className="relative h-full flex flex-col justify-center px-12 md:px-24">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-shop-primary font-black uppercase tracking-[0.3em] text-xs mb-4"
                        >
                            Engineered Performance
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-8"
                        >
                            The <span className="text-reveal-container">Gear<span className="text-reveal-overlay text-shop-primary" /></span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <Button variant="primary" size="lg" className="px-12 py-6 text-sm font-black uppercase tracking-widest bg-shop-primary hover:bg-white hover:text-shop-primary transition-all duration-300">
                                Enter the Shop
                            </Button>
                        </motion.div>
                    </div>
                </Link>

                {/* Travel Hero (Luxury/Right) */}
                <Link
                    href="/travel"
                    className="relative flex-1 group overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200")' }}
                    />
                    <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/20 transition-colors duration-700" />

                    <div className="relative h-full flex flex-col justify-center items-end px-12 md:px-24 text-right">
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-travel-accent font-serif italic text-xl mb-4"
                        >
                            Experience Designers
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white text-6xl md:text-8xl font-serif leading-tight mb-8"
                        >
                            The <span className="text-reveal-container">Journey<span className="text-reveal-overlay text-travel-accent" /></span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <Button variant="outline" size="lg" className="border-white text-white px-12 py-6 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300">
                                Curate Your Trip
                            </Button>
                        </motion.div>
                    </div>
                </Link>
            </div>

            {/* Values Section */}
            <div className="py-32 bg-stone-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 }
                            }
                        }}
                        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 text-center"
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="space-y-6 group"
                        >
                            <div className="flex justify-center">
                                <HugeiconsIcon
                                    icon={ZapIcon}
                                    size={40}
                                    strokeWidth={1.5}
                                    className="text-shop-primary transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">Innovation</h3>
                            <p className="text-stone-600 text-sm leading-relaxed font-medium">Cutting-edge technology meeting timeless craftsmanship.</p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="space-y-6 group"
                        >
                            <div className="flex justify-center">
                                <HugeiconsIcon
                                    icon={GlobeIcon}
                                    size={40}
                                    strokeWidth={1.5}
                                    className="text-travel-accent transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">Presence</h3>
                            <p className="text-stone-600 text-sm leading-relaxed font-medium">A global network for the borderless enthusiast.</p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="space-y-6 group"
                        >
                            <div className="flex justify-center">
                                <HugeiconsIcon
                                    icon={Shield01Icon}
                                    size={40}
                                    strokeWidth={1.5}
                                    className="text-stone-900 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">Integrity</h3>
                            <p className="text-stone-600 text-sm leading-relaxed font-medium">Every detail vetted by our leading concierge team.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
