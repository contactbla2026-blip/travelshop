'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useCart } from '@/components/shop/CartContext'
import styles from './cart.module.css'

export default function CartPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

    const handleCheckout = () => {
        if (!session) {
            router.push('/login')
            return
        }
        router.push('/checkout')
    }

    if (items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <Card className={styles.emptyCard}>
                    <div className={styles.emptyIcon}>🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                    <Button variant="primary" onClick={() => router.push('/shop')}>
                        Browse Products
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <h1>Shopping Cart</h1>

                <div className={styles.cartLayout}>
                    <div className={styles.cartItems}>
                        {items.map((item) => (
                            <Card key={item.productId} className={styles.cartItem}>
                                {item.image && (
                                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                                )}

                                <div className={styles.itemInfo}>
                                    <h3>{item.title}</h3>
                                    <p className={styles.itemPrice}>${item.price}</p>
                                </div>

                                <div className={styles.itemControls}>
                                    <div className={styles.quantityControls}>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            className={styles.quantityBtn}
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            className={styles.quantityBtn}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className={styles.removeBtn}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className={styles.itemTotal}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <Card className={styles.summaryCard}>
                            <h3>Order Summary</h3>

                            <div className={styles.summaryRow}>
                                <span>Subtotal:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Shipping:</span>
                                <span>Calculated at checkout</span>
                            </div>

                            <div className={styles.summaryTotal}>
                                <span>Total:</span>
                                <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button
                                variant="ghost"
                                fullWidth
                                onClick={() => router.push('/shop')}
                            >
                                Continue Shopping
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
