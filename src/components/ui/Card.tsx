import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    hover?: boolean
    glass?: boolean
    skeleton?: boolean
    className?: string
}

export default function Card({
    children,
    hover = false,
    glass = false,
    skeleton = false,
    className = '',
    ...props
}: CardProps) {
    if (skeleton) {
        return (
            <div className={cn('animate-pulse bg-stone-100 overflow-hidden', className)}>
                <div className="h-64 bg-stone-200" />
                <div className="p-6 space-y-4">
                    <div className="h-4 bg-stone-200 w-3/4" />
                    <div className="h-4 bg-stone-200 w-1/2" />
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -8 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'group relative overflow-hidden border border-transparent transition-shadow duration-700',
                hover && 'hover:border-stone-200 hover:shadow-2xl',
                glass ? 'glass-nav' : 'bg-white',
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500 pointer-events-none z-10" />
            {children}
        </motion.div>
    )
}
