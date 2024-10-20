import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { getProductsById } from '@/service/product-service'

interface DialogDetailProps {
    isDialogDetailOpen: boolean
    setIsDialogDetailOpen: (open: boolean) => void
    selectedProductId: number
}

interface Product {
    product_id: number
    name: string
    description: string
    rating: number
    stock: number
    price: number
    date: string
}

interface ApiResponse {
    data: Product
    status: string
    statusCode: number
    message: string
}

export const DialogDetail = ({ isDialogDetailOpen, setIsDialogDetailOpen, selectedProductId }: DialogDetailProps) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isDialogDetailOpen && selectedProductId) {
            setLoading(true)
            setError(null)
            getProductsById(selectedProductId)
                .then((response: ApiResponse) => {
                    console.log('Fetched product data:', response)
                    if (response.status === 'success' && response.data) {
                        setProduct(response.data)
                    } else {
                        setError('Failed to load product details. Please try again.')
                    }
                })
                .catch((err) => {
                    console.error('Error fetching product details:', err)
                    setError('Failed to load product details. Please try again.')
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [isDialogDetailOpen, selectedProductId])

    return (
        <Dialog open={isDialogDetailOpen} onOpenChange={setIsDialogDetailOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {loading ? (
                        <p>Loading product details...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : product ? (
                        <div className="space-y-4">
                            <div className="my-2 space-y-5  font-semibold">
                                <div className="border p-2 rounded">
                                    <label className=" text-md">Product Name:</label> {product.name}
                                </div>
                                <div className="border p-2 rounded">
                                    <label className=" text-md">Description:</label> {product.description}
                                </div>
                                <div className="border p-2 rounded">
                                    <label className=" text-md">Stock:</label> {product.stock}
                                </div>
                                <div className="border p-2 rounded">
                                    <label className=" text-md">Price:</label> {typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                                </div>
                                <div className="border p-2 rounded">
                                    <label className=" text-md">Date:</label> {product.date ? new Date(product.date).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <p>No product details available.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}