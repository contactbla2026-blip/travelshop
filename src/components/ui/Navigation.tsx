'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    ShoppingCart01Icon,
    UserIcon,
    Logout01Icon,
    Menu01Icon
} from '@hugeicons/core-free-icons'
import Button from '@/components/ui/Button'
import { useCart } from '@/components/shop/CartContext'
import { cn } from '@/lib/utils'

export default function Navigation() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const { totalItems } = useCart()
    const [scrolled, setScrolled] = useState(false)
    const isTravel = pathname?.startsWith('/travel')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const getLinkClasses = (path: string) => {
        const baseClasses = "text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300 relative py-2";
        const isActive = pathname === path;

        if (isTravel && !scrolled) {
            return cn(baseClasses, isActive ? "text-white" : "text-white/60 hover:text-white");
        }

        return cn(baseClasses, isActive ? "text-shop-primary" : "text-stone-500 hover:text-shop-primary");
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                scrolled ? 'glass-nav py-4' : 'py-8',
                isTravel && !scrolled ? 'bg-transparent text-white' : (isTravel && scrolled ? 'text-stone-900' : 'bg-white/90 text-stone-900 border-b border-stone-100')
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="group flex items-center">
                    <motion.span
                        layout
                        className={cn(
                            "text-2xl font-black uppercase tracking-tighter italic transition-colors",
                            isTravel && !scrolled ? 'text-white' : 'text-stone-900 group-hover:text-shop-primary'
                        )}
                    >
                        T<span className="hidden sm:inline">RAVEL</span>
                        <span className={cn("ml-0.5", scrolled || !isTravel ? 'text-shop-primary' : 'text-travel-accent')}>S<span className="hidden sm:inline">HOP</span></span>
                    </motion.span>
                </Link>

                <div className="hidden md:flex items-center space-x-12">
                    {['/shop', '/travel', ...(session ? ['/dashboard'] : [])].map((path) => (
                        <Link key={path} href={path} className={getLinkClasses(path)}>
                            {path.replace('/', '')}
                            {pathname === path && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className={cn(
                                        "absolute bottom-0 left-0 right-0 h-0.5",
                                        isTravel && !scrolled ? "bg-white" : "bg-shop-primary"
                                    )}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-8">
                    <Link href="/cart" className="relative group">
                        <HugeiconsIcon
                            icon={ShoppingCart01Icon}
                            size={24}
                            strokeWidth={2}
                            className={cn(
                                "transition-transform duration-300 group-hover:scale-110",
                                isTravel && !scrolled ? "text-white" : "text-stone-900 group-hover:text-shop-primary"
                            )}
                        />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-2 -right-2 bg-shop-primary text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    {session ? (
                        <div className="flex items-center space-x-6">
                            <Link href="/dashboard">
                                <HugeiconsIcon
                                    icon={UserIcon}
                                    size={24}
                                    className={cn(
                                        "transition-colors",
                                        isTravel && !scrolled ? "text-white/60 hover:text-white" : "text-stone-400 hover:text-stone-900"
                                    )}
                                />
                            </Link>
                            <button onClick={() => signOut()} className="group">
                                <HugeiconsIcon
                                    icon={Logout01Icon}
                                    size={24}
                                    className={cn(
                                        "transition-colors",
                                        isTravel && !scrolled ? "text-white/60 hover:text-white" : "text-stone-400 hover:text-shop-primary"
                                    )}
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <Link href="/login" className={getLinkClasses('/login')}>
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <Button
                                    variant={isTravel && !scrolled ? "outline" : "primary"}
                                    size="sm"
                                    className={cn(
                                        "rounded-none",
                                        isTravel && !scrolled && "border-white text-white hover:bg-white hover:text-stone-900"
                                    )}
                                >
                                    Join
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}
