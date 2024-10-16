import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { ChevronLeft, ChevronRight, Star, LayoutGrid, List } from 'lucide-react'

export const ProductList = () => {
    const [view, setView] = useState('grid')
    const products = [
        { id: 1, name: "Modern Desk Lamp", price: 59.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.5 },
        { id: 2, name: "Ergonomic Office Chair", price: 199.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.8 },
        { id: 3, name: "Wireless Bluetooth Earbuds", price: 79.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.2 },
        { id: 4, name: "Smart Home Security Camera", price: 129.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.6 },
        { id: 5, name: "Portable Power Bank", price: 39.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.4 },
        { id: 6, name: "Stainless Steel Water Bottle", price: 24.99, image: "https://picsum.photos/id/1018/600/400", rating: 4.7 },
    ]

    return (
        <main className='p-1 md:p-10'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Our Products</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex border rounded-md">
                        <Button variant="ghost" size="icon" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-secondary' : ''}>
                            <LayoutGrid className='w-6 h-6' />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setView('list')} className={view === 'list' ? 'bg-secondary' : ''}>
                            <List className='w-6 h-6' />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {products.map((product) => (
                    <Card key={product.id} className={view === 'list' ? 'flex flex-row' : ''}>
                        <img src={product.image} alt={product.name} className={`object-cover ${view === 'grid' ? 'h-[18rem] w-full' : 'h-full w-48'}`} />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                                <Button>Add to Cart</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
                <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </main>
    )
}