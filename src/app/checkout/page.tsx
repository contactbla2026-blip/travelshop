'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useCart } from '@/components/shop/CartContext'
import styles from './checkout.module.css'

export default function CheckoutPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { items, totalPrice, clearCart } = useCart()
    const [loading, setLoading] = useState(false)

    if (!session) {
        router.push('/login')
        return null
    }

    if (items.length === 0) {
        router.push('/cart')
        return null
    }

    const handlePlaceOrder = async () => {
        setLoading(true)

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error || 'Order failed')
            } else {
                clearCart()
                router.push(`/orders/${data.id}`)
            }
        } catch (error) {
            alert('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.checkoutPage}>
            <div className="container">
                <h1>Checkout</h1>

                <div className={styles.checkoutLayout}>
                    <div className={styles.checkoutForm}>
                        <Card>
                            <h3>Order Summary</h3>
                            <div className={styles.orderItems}>
                                {items.map((item) => (
                                    <div key={item.productId} className={styles.orderItem}>
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.title}</span>
                                            <span className={styles.itemQty}>x{item.quantity}</span>
                                        </div>
                                        <span className={styles.itemPrice}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3>Shipping Information</h3>
                            <p className={styles.note}>
                                For this MVP, shipping details will be collected after order placement.
                            </p>
                        </Card>

                        <Card>
                            <h3>Payment Method</h3>
                            <p className={styles.note}>
                                Payment integration will be completed in the next phase.
                                For now, orders are created with PENDING status.
                            </p>
                        </Card>
                    </div>

                    <div className={styles.orderSummary}>
                        <Card className={styles.summaryCard}>
                            <h3>Order Total</h3>

                            <div className={styles.summaryRow}>
                                <span>Subtotal:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Shipping:</span>
                                <span>TBD</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Tax:</span>
                                <span>TBD</span>
                            </div>

                            <div className={styles.summaryTotal}>
                                <span>Total:</span>
                                <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </Button>

                            <p className={styles.disclaimer}>
                                By placing this order, you agree to our terms and conditions.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
