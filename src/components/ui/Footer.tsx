import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-shop-bg border-t border-gray-200 pt-20 pb-12 font-sans text-shop-text">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <h4 className="text-xl font-black uppercase tracking-tighter italic">
                        Travel<span className="text-shop-primary">Shop</span>
                    </h4>
                    <p className="text-shop-subtext text-sm leading-relaxed font-medium">
                        Curating high-performance equipment and bespoke travel experiences for the discerning enthusiast.
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Explore</h5>
                    <Link href="/travel" className="text-sm font-bold hover:text-shop-primary transition-colors">Bespoke Travel</Link>
                    <Link href="/shop" className="text-sm font-bold hover:text-shop-primary transition-colors">Technical Shop</Link>
                </div>

                <div className="flex flex-col space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Account</h5>
                    <Link href="/dashboard" className="text-sm font-bold hover:text-shop-primary transition-colors">Member Dashboard</Link>
                    <Link href="/login" className="text-sm font-bold hover:text-shop-primary transition-colors">Sign In</Link>
                    <Link href="/signup" className="text-sm font-bold hover:text-shop-primary transition-colors">Join Collective</Link>
                </div>

                <div className="flex flex-col space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Concierge</h5>
                    <a href="mailto:support@travelshop.com" className="text-sm font-bold hover:text-shop-primary transition-colors">Contact Support</a>
                    <a href="#" className="text-sm font-bold hover:text-shop-primary transition-colors">Privacy Charter</a>
                    <a href="#" className="text-sm font-bold hover:text-shop-primary transition-colors">Service Terms</a>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-shop-subtext">
                <p>&copy; 2026 TravelShop Collective. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="hover:text-shop-primary cursor-pointer">Instagram</span>
                    <span className="hover:text-shop-primary cursor-pointer">Strava</span>
                    <span className="hover:text-shop-primary cursor-pointer">LinkedIn</span>
                </div>
            </div>
        </footer>
    )
}
