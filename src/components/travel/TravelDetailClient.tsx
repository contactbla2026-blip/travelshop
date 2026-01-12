'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    Location01Icon,
    Time02Icon,
    PassportIcon,
    Calendar01Icon,
    ArrowRight01Icon,
    Globe02Icon,
    Ticket01Icon
} from '@hugeicons/core-free-icons'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface TravelDetailClientProps {
    listing: any
    relatedListings?: any[]
}

export default function TravelDetailClient({ listing, relatedListings = [] }: TravelDetailClientProps) {
    const router = useRouter()
    const [activeImage, setActiveImage] = useState(0)

    return (
        <div className="min-h-screen bg-travel-bg pt-32 pb-24 text-travel-text">
            <div className="container mx-auto px-6">
                {/* Immersive Gallery Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32"
                >
                    <div className="lg:col-span-8 aspect-video overflow-hidden relative group">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                src={listing.images[activeImage]}
                                alt={listing.title}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-1000" />
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto max-h-[60vh] lg:max-h-full no-scrollbar">
                        {listing.images.map((img: string, i: number) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveImage(i)}
                                className={`shrink-0 aspect-video overflow-hidden transition-all duration-700 border-none outline-none ${activeImage === i ? 'opacity-100 ring-2 ring-travel-accent ring-inset' : 'opacity-40 hover:opacity-100'}`}
                            >
                                <img src={img} alt={`${listing.title} ${i}`} className="w-full h-full object-cover" />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-2"
                    >
                        <span className="text-travel-accent font-serif italic text-2xl mb-4 block">Selected Destinations</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-travel-primary mb-12 leading-none">
                            {listing.title}
                        </h1>
                        <div className="flex items-center space-x-12 mb-16 pb-12 border-b border-stone-200">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={Location01Icon} size={14} />
                                    Location
                                </span>
                                <span className="font-serif italic text-xl">{listing.location}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={Time02Icon} size={14} />
                                    Duration
                                </span>
                                <span className="font-serif italic text-xl">{listing.duration}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-2 flex items-center gap-2">
                                    <HugeiconsIcon icon={Ticket01Icon} size={14} />
                                    Investment
                                </span>
                                <span className="font-serif italic text-xl">From ${listing.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="prose prose-stone prose-2xl max-w-none">
                            <p className="font-serif italic text-stone-600 leading-relaxed text-3xl">
                                {listing.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="sticky top-40 bg-white p-12 shadow-2xl border border-stone-100">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-8 border-b border-stone-100 pb-4 flex items-center gap-2">
                                <HugeiconsIcon icon={PassportIcon} size={14} />
                                Private Consultation
                            </h3>
                            <p className="font-medium text-sm leading-relaxed mb-8 text-stone-600">
                                This experience is hand-curated and subject to limited seasonal windows. Connect with our curators to secure your arrival.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full bg-stone-900 py-8 text-xs font-black uppercase tracking-widest hover:bg-stone-800 transition-all rounded-none group"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    Inquire Availability
                                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                            <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-300">
                                <span>Reference ID: TS-EXP-001</span>
                                <span className="text-stone-900 underline underline-offset-4 cursor-pointer flex items-center gap-1.5">
                                    <HugeiconsIcon icon={Globe02Icon} size={12} />
                                    Concierge Desk
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Journeys */}
                {relatedListings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-32 pt-32 border-t border-stone-200"
                    >
                        <div className="flex items-end justify-between mb-16 px-4">
                            <div>
                                <span className="text-travel-accent font-serif italic text-2xl">Bespoke Options</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-travel-primary mt-4 leading-none">
                                    Similar <span className="text-stone-300 italic">Horizons</span>
                                </h2>
                            </div>
                            <Link href="/travel" className="font-serif italic text-stone-400 border-b border-stone-200 pb-1 hover:text-travel-primary transition-colors flex items-center gap-2">
                                Return to Portfolio
                                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {relatedListings.map((l: any) => (
                                <Link key={l.id} href={`/travel/${l.id}`} className="group">
                                    <div className="aspect-video overflow-hidden relative mb-6">
                                        <motion.img
                                            src={l.images[0]}
                                            alt={l.title}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.8 }}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-serif italic text-stone-500 group-hover:text-stone-900 transition-colors">{l.title}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-300 group-hover:text-stone-500 transition-colors mt-2 flex items-center gap-2 italic">
                                        <HugeiconsIcon icon={Location01Icon} size={12} />
                                        {l.location}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
