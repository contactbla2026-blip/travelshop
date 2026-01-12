import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST create booking
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { travelListingId, bookingDate } = await req.json()

        if (!travelListingId || !bookingDate) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Verify listing exists
        const listing = await prisma.travelListing.findUnique({
            where: { id: travelListingId },
        })

        if (!listing) {
            return NextResponse.json(
                { error: 'Travel listing not found' },
                { status: 404 }
            )
        }

        // Check availability
        const availability = listing.availability as any
        if (!availability[bookingDate]) {
            return NextResponse.json(
                { error: 'Selected date is not available' },
                { status: 400 }
            )
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: (session.user as any).id,
                travelListingId,
                bookingDate: new Date(bookingDate),
                totalAmount: listing.price,
                status: 'PENDING',
            },
            include: {
                travelListing: true,
            },
        })

        return NextResponse.json(booking, { status: 201 })
    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        )
    }
}

// GET user's bookings
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: (session.user as any).id },
            include: {
                travelListing: true,
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(bookings)
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        )
    }
}
