import { prisma } from '@/lib/prisma'
import ListingList from '@/components/travel/ListingList'

async function getTravelListings() {
    console.log('[Diagnostic] Fetching travel listings in TravelPage...')
    console.log('[Diagnostic] DATABASE_URL exists:', !!process.env.DATABASE_URL)

    try {
        const listings = await prisma.travelListing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        console.log(`[Diagnostic] Successfully fetched ${listings.length} travel listings`)
        return listings.map((listing: any) => ({
            ...listing,
            images: JSON.parse(listing.images || '[]'),
        }))
    } catch (error) {
        console.error('Error fetching travel listings:', error)
        return []
    }
}

export default async function TravelPage() {
    const listings = await getTravelListings()

    return (
        <div className="min-h-screen bg-travel-bg pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-24">
                    <span className="text-travel-accent font-serif italic text-xl">Bespoke Journeys</span>
                    <h1 className="text-6xl md:text-8xl font-serif leading-tight text-travel-primary mt-4">
                        Curated <span className="text-reveal-container text-stone-300">Portfolios<span className="text-reveal-overlay text-stone-100" /></span>
                    </h1>
                </div>

                <ListingList listings={listings} />

                {listings.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-stone-400 font-serif italic text-xl">New horizons are being scouted. Return soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
