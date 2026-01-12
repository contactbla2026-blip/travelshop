import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET all travel listings
export async function GET(req: NextRequest) {
    try {
        const listings = await prisma.travelListing.findMany({
            orderBy: { createdAt: 'desc' },
        })

        // Parse JSON strings from SQLite
        const parsedListings = listings.map(listing => ({
            ...listing,
            images: JSON.parse(listing.images || '[]'),
            availability: JSON.parse(listing.availability || '{}')
        }))

        return NextResponse.json(parsedListings)
    } catch (error) {
        console.error('Error fetching travel listings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch listings' },
            { status: 500 }
        )
    }
}

// POST create new travel listing (admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { title, description, images, price, location, duration } = await req.json()

        if (!title || !description || !price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const listing = await prisma.travelListing.create({
            data: {
                title,
                description,
                images: JSON.stringify(images || []),
                price: parseFloat(price),
                location,
                duration,
                availability: '{}',
            },
        })

        return NextResponse.json({
            ...listing,
            images: JSON.parse(listing.images),
            availability: JSON.parse(listing.availability)
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating travel listing:', error)
        return NextResponse.json(
            { error: 'Failed to create listing' },
            { status: 500 }
        )
    }
}
