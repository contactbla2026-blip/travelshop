import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const listing = await prisma.travelListing.findUnique({
            where: { id: params.id },
        })

        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
        }

        return NextResponse.json({
            ...listing,
            images: JSON.parse(listing.images || '[]'),
            availability: JSON.parse(listing.availability || '{}')
        })
    } catch (error) {
        console.error('Error fetching travel listing:', error)
        return NextResponse.json(
            { error: 'Failed to fetch listing' },
            { status: 500 }
        )
    }
}
