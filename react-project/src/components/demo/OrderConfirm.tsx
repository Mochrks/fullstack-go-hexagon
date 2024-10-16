import { CheckCircle } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

export const OrderConfirm = () => {
    const navigate = useNavigate();

    const handleContinueShipping = () => {
        navigate("/products")
    }

    return (
        <div className="max-w-2xl mx-auto text-center py-10">
            <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600">Thank you for your purchase. Your order has been received and is being processed.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Order Number:</span>
                        <span className="font-semibold">#12345</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Order Date:</span>
                        <span>May 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-semibold">$295.98</span>
                    </div>


                </CardContent>
            </Card>
            <div className="mt-8 space-y-4">
                <Button variant="default" onClick={handleContinueShipping}>Continue Shopping</Button>
            </div>
        </div>
    )
}
