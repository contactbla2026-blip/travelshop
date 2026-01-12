import Link from 'next/link'
import Card from '@/components/ui/Card'
import styles from './dashboard.module.css'

async function getUserBookings() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/bookings`, {
        cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
}

async function getUserOrders() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`, {
        cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
}

export default async function DashboardPage() {
    const [bookings, orders] = await Promise.all([
        getUserBookings(),
        getUserOrders(),
    ])

    return (
        <div className={styles.dashboard}>
            <div className="container">
                <h1>My Dashboard</h1>

                <div className={styles.stats}>
                    <Card className={styles.statCard}>
                        <div className={styles.statIcon}>✈️</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{bookings.length}</div>
                            <div className={styles.statLabel}>Travel Bookings</div>
                        </div>
                    </Card>

                    <Card className={styles.statCard}>
                        <div className={styles.statIcon}>📦</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{orders.length}</div>
                            <div className={styles.statLabel}>Orders</div>
                        </div>
                    </Card>
                </div>

                <div className={styles.sections}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Bookings</h2>
                            <Link href="/bookings" className={styles.viewAll}>
                                View All →
                            </Link>
                        </div>

                        {bookings.length === 0 ? (
                            <Card className={styles.emptyState}>
                                <p>No bookings yet. Start exploring travel destinations!</p>
                                <Link href="/travel" className={styles.ctaLink}>
                                    Browse Travel
                                </Link>
                            </Card>
                        ) : (
                            <div className={styles.itemsList}>
                                {bookings.slice(0, 3).map((booking: any) => (
                                    <Card key={booking.id} hover className={styles.item}>
                                        <div className={styles.itemHeader}>
                                            <h3>{booking.travelListing.title}</h3>
                                            <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className={styles.itemDate}>
                                            📅 {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>
                                        <p className={styles.itemPrice}>${booking.totalAmount}</p>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Orders</h2>
                            <Link href="/orders" className={styles.viewAll}>
                                View All →
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <Card className={styles.emptyState}>
                                <p>No orders yet. Check out our products!</p>
                                <Link href="/shop" className={styles.ctaLink}>
                                    Browse Products
                                </Link>
                            </Card>
                        ) : (
                            <div className={styles.itemsList}>
                                {orders.slice(0, 3).map((order: any) => (
                                    <Card key={order.id} hover className={styles.item}>
                                        <div className={styles.itemHeader}>
                                            <h3>Order #{order.id.slice(0, 8)}</h3>
                                            <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className={styles.itemDate}>
                                            📅 {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className={styles.itemPrice}>${order.totalAmount}</p>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
