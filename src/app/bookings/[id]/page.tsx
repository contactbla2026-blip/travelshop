import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import styles from './BookingConfirmation.module.css'

async function getBooking(id: string) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/bookings/${id}`, {
        cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
}

export default async function BookingConfirmationPage({
    params,
}: {
    params: { id: string }
}) {
    const booking = await getBooking(params.id)

    if (!booking) {
        return (
            <div className={styles.container}>
                <Card>
                    <h1>Booking not found</h1>
                    <p>The booking you're looking for doesn't exist.</p>
                    <Link href="/travel">
                        <Button variant="primary">Browse Travel</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Card className={styles.confirmationCard}>
                <div className={styles.successIcon}>✓</div>
                <h1>Booking Confirmed!</h1>
                <p className={styles.subtitle}>
                    Your travel booking has been successfully created
                </p>

                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>Booking ID:</span>
                        <span className={styles.value}>{booking.id}</span>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Destination:</span>
                        <span className={styles.value}>{booking.travelListing.title}</span>
                    </div>

                    {booking.travelListing.location && (
                        <div className={styles.detailRow}>
                            <span className={styles.label}>Location:</span>
                            <span className={styles.value}>
                                📍 {booking.travelListing.location}
                            </span>
                        </div>
                    )}

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>
                            {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Total Amount:</span>
                        <span className={`${styles.value} ${styles.amount}`}>
                            ${booking.totalAmount}
                        </span>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Status:</span>
                        <span className={`${styles.value} ${styles.status}`}>
                            {booking.status}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/dashboard">
                        <Button variant="primary" size="lg">
                            View My Bookings
                        </Button>
                    </Link>
                    <Link href="/travel">
                        <Button variant="outline" size="lg">
                            Browse More Destinations
                        </Button>
                    </Link>
                </div>

                <div className={styles.note}>
                    <p>
                        A confirmation email has been sent to {booking.user.email}. Please
                        check your inbox for booking details and next steps.
                    </p>
                </div>
            </Card>
        </div>
    )
}
