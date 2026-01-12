const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

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

    // Create realistic Stenger Bike-style products
    const products = [
        // BIKES
        {
            title: 'S-Works Tarmac SL8 - Dura Ace',
            description: 'The fastest race bike in the world. Features the new FACT 12r carbon frame, Shimano Dura-Ace Di2 12-speed groupset, and Roval Rapide CLX II tubeless-ready wheels. Engineered for pure speed and handling precision.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1532298229144-0ec0c57df386?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800']),
            price: 14000.00,
            inventory: 5,
        },
        {
            title: 'Trek Madone SLR 9 Axis',
            description: 'The ultimate aero superbike. 800 Series OCLV Carbon, IsoFlow technology, and SRAM RED eTap AXS. The Madone SLR 9 is the fastest road race bike Trek has ever made.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1576435728678-35d0160e8169?w=800']),
            price: 13299.99,
            inventory: 3,
        },
        {
            title: 'Cannondale SuperSix EVO 1',
            description: 'Fast just got faster. A pure road bike. Light, smooth and ultra fast. The evolution of the classic race machine. Features Hi-MOD Carbon frame and SRAM RED AXS.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1507035895480-08acdf9b940a?w=800']),
            price: 11500.00,
            inventory: 8,
        },
        {
            title: 'Cervélo R5 Disc Force eTap',
            description: 'High performance all-rounder. The R5 has one job: get to the top, fast. But for all the glory and fanfare that comes with a summit finish, it’s rarely the only climb of the day.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1511994298220-41270c1f2dcb?w=800']),
            price: 8500.00,
            inventory: 10,
        },
        {
            title: 'Pinarello Dogma F Dura Ace',
            description: 'The Art of Balance. Seven of the last 10 Tours de France have been conquered on a DOGMA, and the new generation is ready to continue that legacy of success.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1596727147705-54a9d0820948?w=800']),
            price: 15500.00,
            inventory: 2,
        },
        {
            title: 'Specialized Aethos Pro',
            description: 'For the love of riding. The Aethos frame has been designed with the perfect combination of ultimate ride feel, light weight, and style. Features SRAM Force eTap AXS.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1623992224726-2cb3fd8f95c0?w=800']),
            price: 8000.00,
            inventory: 7,
        },
        {
            title: 'Santa Cruz Megatower CC X01',
            description: 'The ultimate power-wheeling, bump-chewing enduro beast. With 165mm of VPP rear travel and a 170mm fork, the Megatower is built for the toughest descents.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800']),
            price: 9299.00,
            inventory: 4,
        },
        {
            title: 'Yeti SB160 Turq T1',
            description: 'Race bred. Race ready. The SB160 is built on one of the most winning platforms in EWS history. Refined kinematics and geometry for pure speed.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1455655078716-43b9e4a3c103?w=800']),
            price: 9800.00,
            inventory: 6,
        },
        // WHEELS & COMPONENTS
        {
            title: 'Zipp 303 Firecrest Carbon Wheelset',
            description: 'The Zipp 303 Firecrest Tubeless Disc-brake wheelset is designed for the real world. A world of imperfect conditions, road surfaces, and elements.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1598462719277-28d57d725176?w=800']),
            price: 2100.00,
            inventory: 15,
        },
        {
            title: 'Enve SES 3.4 AR Wheelset',
            description: 'Versatile aero road wheels. The SES 3.4 AR is the ultimate all-road wheelset, aerodynamically optimized for 28mm to 32mm tires.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1626006096531-15545dd05584?w=800']),
            price: 2550.00,
            inventory: 12,
        },
        {
            title: 'Garmin Edge 1040 Solar',
            description: 'Never stop cycling with the ultimate solar powered GPS bike computer you can depend on when you need it most. 100+ hours of battery life.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1631528642783-6cc35146c87e?w=800']),
            price: 749.99,
            inventory: 40,
        },
        {
            title: 'Wahoo Elemnt Roam V2',
            description: 'Built for the ride. Smart navigation features, crystal clear 2.7" color display, and long lasting battery. The most powerful on-bike computer aimed at performance.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1522703893608-f404d0ced864?w=800']),
            price: 399.99,
            inventory: 35,
        },
        // GEAR
        {
            title: 'POC Ventral Air Mips',
            description: 'Aerodynamic performance, safety and ventilation without compromise. Use the Ventral Air MIPS for cool styling and cooler heads on the hottest days.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1559132205-d01c034a7065?w=800']),
            price: 260.00,
            inventory: 60,
        },
        {
            title: 'Kask Protone Icon',
            description: 'The latest evolution of the legendary Protone helmet. Improved aerodynamics, ventilation, and fit. Used by Team Ineos Grenadiers.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1515949176317-916e780fb960?w=800']),
            price: 300.00,
            inventory: 45,
        },
        {
            title: 'Oakley Sutro Lite Sweep',
            description: 'The Sutro family expands with a semi-rimless version of the popular style for greater field of view. Functional sport design with coverage.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1616428747477-947b19b78c52?w=800']),
            price: 184.00,
            inventory: 100,
        },
        {
            title: 'Rapha Pro Team Jersey',
            description: 'Elite racewear. Lightweight, high-wicking fabrics and an aerodynamic fit make this jersey the choice for riding in the heat of competition.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=800']),
            price: 195.00,
            inventory: 80,
        },
        {
            title: 'Castelli Free Aero RC Bibshort',
            description: 'The perfect mix of comfort and speed. Engineered for top-level racing, widely accessible for every rider. Features the Progetto X2 Air seamless pad.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1591142502690-34a94602bb42?w=800']),
            price: 220.00,
            inventory: 55,
        },
        {
            title: 'Shimano Dura-Ace Pedals',
            description: 'Lightweight, efficient power transfer. The PD-R9100 is the lightest and most efficient Dura-Ace pedal we have ever made.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1526614180608-20da5d9ccdd9?w=800']),
            price: 280.00,
            inventory: 25,
        },
        {
            title: 'Continental GP5000 S TR',
            description: 'The new standard in road tubeless ready technology. Faster, more comfortable and with increased puncture protection.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1559348349-86f163ed7779?w=800']),
            price: 79.99,
            inventory: 200,
        },
        {
            title: 'Silca Pista Plus Floor Pump',
            description: 'The pump that started it all. Built to last a lifetime. High pressure accuracy and durable steel construction. An heirloom quality tool.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1629814406692-23c2240b2e3e?w=800']),
            price: 165.00,
            inventory: 20,
        }
    ]

    // Create realistic Adams & Butler-style travel listings (Luxury/Bespoke)
    const travelListings = [
        {
            title: 'Private Castles of Ireland',
            description: 'An exclusive journey through the historic castles of the Emerald Isle. Stay in 5-star converted fortresses, enjoy private falconry lessons, and dine with aristocracy. A truly bespoke experience into Irish heritage.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1533634590487-73d2a3c773fe?w=800', 'https://images.unsplash.com/photo-1590089415225-401eb6b9b93d?w=800']),
            price: 8500.00,
            location: 'Multiple Locations, Ireland',
            duration: '10 Days',
            availability: JSON.stringify({
                '2026-05-10': true,
                '2026-06-15': true,
            }),
        },
        {
            title: 'Kyoto Geisha Districts & Private Tea Ceremony',
            description: 'Immerse yourself in Old Japan. Private access to restricted Geisha districts in Gion, a tea ceremony with a Grand Master, and stays in ultra-luxury Ryokans with private onsens.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=800']),
            price: 12000.00,
            location: 'Kyoto, Japan',
            duration: '8 Days',
            availability: JSON.stringify({
                '2026-04-01': true,
                '2026-10-20': true,
            }),
        },
        {
            title: 'Luxury Safari at Singita Grumeti',
            description: 'The pinnacle of African safaris. Stay in the world-renowned Singita lodges in Tanzania. Private game drives, gourmet bush dinners, and unmatched wildlife viewing in the Serengeti.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800']),
            price: 25000.00,
            location: 'Serengeti, Tanzania',
            duration: '7 Days',
            availability: JSON.stringify({
                '2026-07-15': true,
                '2026-08-10': true,
            }),
        },
        {
            title: 'Amalfi Coast Yacht & Villa Experience',
            description: 'Cruise the Amalfi Coast on a private 80ft yacht, docking at Positano and Capri. Spend nights in a cliffside villa with a private chef. The ultimate Italian summer.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1481973964012-5aa6dc2a7fc2?w=800']),
            price: 18500.00,
            location: 'Amalfi Coast, Italy',
            duration: '7 Days',
            availability: JSON.stringify({
                '2026-06-20': true,
                '2026-07-25': true,
            }),
        },
        {
            title: 'Antarctic Expedition Cruise',
            description: 'Journey to the end of the world in uncompromising luxury. Aboard a new hybrid-electric polar vessel, witness penguins, whales, and icebergs in complete comfort.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1516972332115-4fa5cb1d072f?w=800']),
            price: 35000.00,
            location: 'Antarctica',
            duration: '14 Days',
            availability: JSON.stringify({
                '2026-12-05': true,
                '2027-01-10': true,
            }),
        },
        {
            title: 'Royal Rajasthan: Palaces of India',
            description: 'Live like a Maharaja. Stay in the floating Lake Palace of Udaipur and the Rambagh Palace in Jaipur. Private tours of amber forts and sunset camel rides in the desert.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800']),
            price: 9500.00,
            location: 'Rajasthan, India',
            duration: '12 Days',
            availability: JSON.stringify({
                '2026-11-05': true,
                '2026-02-14': true,
            }),
        },
        {
            title: 'Patagonia Glamping & Trekking',
            description: 'Experience the wild beauty of Torres del Paine while staying in luxury geodesic domes. Guided treks to the base of the towers and gourmet meals with local wines.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1518182170546-07fa6ee5bf39?w=800']),
            price: 6800.00,
            location: 'Torres del Paine, Chile',
            duration: '9 Days',
            availability: JSON.stringify({
                '2026-12-20': true,
                '2027-01-15': true,
            }),
        },
        {
            title: 'French Wine Country Estate Tour',
            description: 'A connoisseur’s tour of Bordeaux and Burgundy. Private cellar tastings at Grand Cru vineyards, Michelin-starred dining, and stays in historic chateaus.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=800']),
            price: 10500.00,
            location: 'Bordeaux & Burgundy, France',
            duration: '8 Days',
            availability: JSON.stringify({
                '2026-09-15': true,
                '2026-10-01': true,
            }),
        },
        {
            title: 'New Zealand South Island Helicopter Tour',
            description: 'See Middle Earth from the sky. Helicopter transfers between luxury lodges in Queenstown, Milford Sound, and Mt. Cook. Glacier landings and private fiord cruises.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1507699622177-388898d9903e?w=800']),
            price: 22000.00,
            location: 'South Island, New Zealand',
            duration: '10 Days',
            availability: JSON.stringify({
                '2026-02-10': true,
                '2026-11-20': true,
            }),
        },
        {
            title: 'Swiss Alps Ski Chalet Retreat',
            description: 'The ultimate winter escape in Zermatt. Private staffing in a ski-in/ski-out chalet with views of the Matterhorn. Spa treatments and heli-skiing options available.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800']),
            price: 28000.00,
            location: 'Zermatt, Switzerland',
            duration: '7 Days',
            availability: JSON.stringify({
                '2026-12-23': true,
                '2027-02-10': true,
            }),
        },
        {
            title: 'Galapagos Islands Luxury Catamaran',
            description: 'Follow in Darwin’s footsteps aboard a stable, luxury catamaran. Expert naturalist guides, snorkeling with sea lions, and visits to untouched islands.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800']),
            price: 11000.00,
            location: 'Galapagos Islands, Ecuador',
            duration: '8 Days',
            availability: JSON.stringify({
                '2026-04-15': true,
                '2026-05-20': true,
            }),
        },
        {
            title: 'Bhutan: Kingdom of Happiness',
            description: 'A spiritual journey through the Himalayas. Visit the Tiger’s Nest monastery, stay in Amankora lodges, and explore a country that prioritizes Gross National Happiness.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1578393521631-0b5c1c0458df?w=800']),
            price: 13500.00,
            location: 'Thimphu & Paro, Bhutan',
            duration: '11 Days',
            availability: JSON.stringify({
                '2026-10-05': true,
                '2026-03-20': true,
            }),
        },
        {
            title: 'Egyptian Nile Cruise & Pyramids',
            description: 'Private access to the Sphinx and Great Pyramid. A 5-night cruise on the Nile aboard the Oberoi Philae. Visit Luxor and the Valley of the Kings with an Egyptologist.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1539650116455-251c93c50148?w=800']),
            price: 9200.00,
            location: 'Cairo & Nile River, Egypt',
            duration: '9 Days',
            availability: JSON.stringify({
                '2026-11-10': true,
                '2027-01-20': true,
            }),
        },
        {
            title: 'Maldives Private Island Escape',
            description: 'Total seclusion on a private island. Overwater villas with slides, underwater restaurants, and dedicated butler service. The definition of barefoot luxury.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1514282401047-d77a7149ba6c?w=800']),
            price: 19000.00,
            location: 'Baa Atoll, Maldives',
            duration: '7 Days',
            availability: JSON.stringify({
                '2026-02-14': true,
                '2026-12-25': true,
            }),
        },
        {
            title: 'Scottish Highlands & Whisky Trail',
            description: 'Drive classic cars through the Scottish Highlands. Private tastings at Macallan and Glenfiddich. Stay in Gleneagles and Inverlochy Castle.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1506368083636-6defb6763a07?w=800']),
            price: 7500.00,
            location: 'Highlands, Scotland',
            duration: '8 Days',
            availability: JSON.stringify({
                '2026-08-15': true,
                '2026-09-10': true,
            }),
        }
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
