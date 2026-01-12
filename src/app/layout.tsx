import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Providers from '@/components/Providers'
import { CartProvider } from '@/components/shop/CartContext'

export const metadata: Metadata = {
    title: 'Travel & Shop - Your Ultimate Destination',
    description: 'Book amazing travel experiences and shop premium products',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <CartProvider>
                        <Navigation />
                        <main>{children}</main>
                        <Footer />
                    </CartProvider>
                </Providers>
            </body>
        </html>
    )
}
