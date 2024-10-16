import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Star } from 'lucide-react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useNavigate } from 'react-router-dom'

export const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const handleCarts = () => {
        navigate('/products/cart')
    }
    return (
        <main className=' p-3 md:p-10'>
            <div className="grid md:grid-cols-2 gap-5">
                <div className=" flex flex-col bg-gray-100 p-5">
                    <div className="flex pb-10 justify-center ">
                        <img src="https://picsum.photos/id/1018/600/400" alt="Product" />
                    </div>
                    <div className='flex px-5'>
                        <div className="grid grid-cols-4 gap-4">
                            <img src="https://picsum.photos/id/1018/600/400" alt="Product thumbnail" />
                            <img src="https://picsum.photos/id/1018/600/400" alt="Product thumbnail" />
                            <img src="https://picsum.photos/id/1018/600/400" alt="Product thumbnail" />
                            <img src="https://picsum.photos/id/1018/600/400" alt="Product thumbnail" />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className='flex  justify-between'>

                            <h1 className="text-3xl font-bold mb-2">Modern Desk Lamp</h1>
                            <Button variant="secondary" onClick={handleCarts}>
                                View Carts
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">(121 reviews)</span>
                        </div>
                        <p className="text-xl font-bold mb-4">$59.99</p>
                        <p className="text-gray-600 mb-6">Illuminate your workspace with our sleek and adjustable Modern Desk Lamp. Perfect for home offices or study areas, this lamp provides ample lighting while adding a touch of contemporary style to your decor.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="color">Color:</Label>
                            <Select defaultValue="black">
                                <SelectTrigger id="color" className="w-[180px]">
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="black">Black</SelectItem>
                                    <SelectItem value="white">White</SelectItem>
                                    <SelectItem value="silver">Silver</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label>Quantity:</Label>
                            <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center">{quantity}</span>
                                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Button className="w-full">Add to Cart</Button>

                    </div>
                    {/* <Separator /> */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Product Details</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                            <li>Adjustable arm and head for precise lighting</li>
                            <li>Energy-efficient LED bulb included</li>
                            <li>Touch-sensitive controls with multiple brightness levels</li>
                            <li>USB charging port for convenient device charging</li>
                            <li>Compact base with cable management system</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}
