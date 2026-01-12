import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface ButtonProps extends HTMLMotionProps<'button'> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    className?: string
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-shop-primary text-white hover:bg-red-700 shadow-lg shadow-red-500/20',
        secondary: 'bg-shop-bg-secondary text-shop-text hover:bg-gray-200',
        outline: 'border-2 border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white',
        ghost: 'text-shop-text hover:bg-shop-bg-secondary font-medium',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs font-black tracking-widest uppercase',
        md: 'px-6 py-3 text-sm font-black tracking-widest uppercase',
        lg: 'px-10 py-5 text-base font-black tracking-widest uppercase',
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    )
}
