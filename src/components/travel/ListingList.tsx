'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    Location01Icon,
    ArrowRight01Icon
} from '@hugeicons/core-free-icons'
import Card from '@/components/ui/Card'

interface ListingListProps {
    listings: any[]
}

export default function ListingList({ listings }: ListingListProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                }
            }}
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
            {listings.map((listing) => (
                <motion.div
                    key={listing.id}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="break-inside-avoid"
                >
                    <Link
                        href={`/travel/${listing.id}`}
                        className="block group"
                    >
                        <Card hover className="bg-[#FAF9F6] border-none shadow-none group-hover:shadow-2xl transition-all duration-700">
                            <div className="relative overflow-hidden aspect-3/4">
                                <motion.img
                                    src={listing.images[0]}
                                    alt={listing.title}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-colors duration-700 z-10" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-2 flex items-center gap-2 italic">
                                            <HugeiconsIcon icon={Location01Icon} size={12} />
                                            {listing.location}
                                        </span>
                                        <h3 className="text-2xl font-serif mb-4 leading-tight">
                                            {listing.title}
                                        </h3>
                                        <div className="h-px w-0 group-hover:w-full bg-white transition-all duration-700 opacity-50" />
                                        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            <span className="text-xs uppercase tracking-widest font-black flex items-center gap-2">
                                                View Journey
                                                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                                            </span>
                                            <span className="text-sm italic font-serif opacity-70">From ${listing.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}
