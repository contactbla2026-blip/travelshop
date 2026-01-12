import TravelDetailClient from '@/components/travel/TravelDetailClient'
import { prisma } from '@/lib/prisma'

async function getTravelData(id: string) {
    try {
        const listing = await prisma.travelListing.findUnique({
            where: { id },
        })

        if (!listing) return null

        const relatedListings = await prisma.travelListing.findMany({
            where: {
                id: { not: id },
            },
            take: 3,
        })

        return {
            listing: {
                ...listing,
                images: typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images,
                availability: typeof listing.availability === 'string' ? JSON.parse(listing.availability) : listing.availability,
            },
            relatedListings: relatedListings.map((l: any) => ({
                ...l,
                images: typeof l.images === 'string' ? JSON.parse(l.images) : l.images,
            })),
        }
    } catch (error) {
        console.error('Error fetching travel data:', error)
        return null
    }
}

export default async function TravelDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const data = await getTravelData(params.id)

    if (!data) {
        return (
            <div className="min-h-screen pt-32 text-center bg-travel-bg">
                <h1 className="text-2xl font-serif italic text-travel-primary">Journey not found</h1>
                <p className="text-stone-500 mt-2">This horizon is currently beyond reach.</p>
            </div>
        )
    }

    return <TravelDetailClient listing={data.listing} relatedListings={data.relatedListings} />
}
