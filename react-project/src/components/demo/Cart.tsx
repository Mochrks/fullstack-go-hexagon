import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

export const Cart = () => {
    const cartItems = [
        { id: 1, name: "Modern Desk Lamp", price: 59.99, quantity: 1, image: "https://picsum.photos/id/1018/600/400" },
        { id: 2, name: "Ergonomic Office Chair", price: 199.99, quantity: 1, image: "https://picsum.photos/id/1018/600/400" },
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = 10
    const total = subtotal + shipping

    return (
        <main className='p-1 md:p-10'>
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="flex items-center space-x-4 p-4">
                                    <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="icon">
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button variant="outline" size="icon">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        <Button variant="ghost" size="icon" className="text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            {/* <Separator /> */}
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button className="w-full">Proceed to Checkout</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}