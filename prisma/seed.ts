import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    })
    console.log('✅ Created admin user:', admin.email)

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10)
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: userPassword,
            name: 'John Doe',
            role: 'USER',
        },
    })
    console.log('✅ Created regular user:', user.email)

    // Create sample travel listings
    const travelListings = [
        {
            title: 'Tropical Paradise in Bali',
            description: 'Experience the magic of Bali with pristine beaches, ancient temples, and vibrant culture. This 7-day adventure includes guided tours, traditional ceremonies, and relaxation at luxury resorts.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800']),
            price: 1299.99,
            location: 'Bali, Indonesia',
            duration: '7 days',
            availability: JSON.stringify({
                '2026-02-15': true,
                '2026-02-22': true,
                '2026-03-01': true,
                '2026-03-15': true,
            }),
        },
        {
            title: 'Northern Lights Adventure',
            description: 'Witness the breathtaking Aurora Borealis in Iceland. Includes glacier hiking, hot spring visits, and expert photography guidance for capturing the perfect northern lights shot.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800']),
            price: 1899.99,
            location: 'Reykjavik, Iceland',
            duration: '5 days',
            availability: JSON.stringify({
                '2026-01-20': true,
                '2026-02-10': true,
                '2026-02-25': true,
            }),
        },
        {
            title: 'Safari in Tanzania',
            description: 'Embark on an unforgettable African safari. See the Big Five in their natural habitat, witness the Great Migration, and stay in luxury tented camps under the stars.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800']),
            price: 2499.99,
            location: 'Serengeti, Tanzania',
            duration: '10 days',
            availability: JSON.stringify({
                '2026-03-10': true,
                '2026-04-05': true,
                '2026-05-15': true,
            }),
        },
    ]

    for (const listing of travelListings) {
        await prisma.travelListing.create({ data: listing })
    }
    console.log(`✅ Created ${travelListings.length} travel listings`)

    // Create sample products
    const products = [
        {
            title: 'Premium Travel Backpack',
            description: 'Durable, water-resistant backpack perfect for travelers. Features multiple compartments, laptop sleeve, and ergonomic design for maximum comfort.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800']),
            price: 89.99,
            inventory: 50,
        },
        {
            title: 'Wireless Noise-Cancelling Headphones',
            description: 'Premium audio quality with active noise cancellation. Perfect for long flights and travel. 30-hour battery life and comfortable over-ear design.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800']),
            price: 249.99,
            inventory: 30,
        },
        {
            title: 'Portable Power Bank',
            description: 'High-capacity 20,000mAh power bank with fast charging. Keep your devices powered on the go. Compact and lightweight design.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800']),
            price: 49.99,
            inventory: 100,
        },
        {
            title: 'Travel Camera Kit',
            description: 'Professional-grade mirrorless camera with travel lens kit. Capture stunning photos and 4K video. Includes carrying case and accessories.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800']),
            price: 1299.99,
            inventory: 15,
        },
    ]

    for (const product of products) {
        await prisma.product.create({ data: product })
    }
    console.log(`✅ Created ${products.length} products`)

    console.log('🎉 Seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
