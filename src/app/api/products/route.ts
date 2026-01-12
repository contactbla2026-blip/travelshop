import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET all products
export async function GET(req: NextRequest) {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        })

        // Parse JSON strings from SQLite
        const parsedProducts = products.map(product => ({
            ...product,
            images: JSON.parse(product.images || '[]')
        }))

        return NextResponse.json(parsedProducts)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST create new product (admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || (session.user as any)?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { title, description, images, price, inventory } = await req.json()

        if (!title || !description || !price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const product = await prisma.product.create({
            data: {
                title,
                description,
                images: JSON.stringify(images || []),
                price: parseFloat(price),
                inventory: parseInt(inventory) || 0,
            },
        })

        return NextResponse.json({
            ...product,
            images: JSON.parse(product.images)
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}
