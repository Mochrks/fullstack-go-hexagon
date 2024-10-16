import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/demo/Navbar'
import { ProductList } from '@/components/demo/ProductList'
import { ProductDetail } from '@/components/demo/ProductDetail'
import { Cart } from '@/components/demo/Cart'
import { About } from '@/components/demo/About'
import { Contact } from '@/components/demo/Contact'
import { OrderConfirm } from '@/components/demo/OrderConfirm'

export const Products = () => {
    // const location = useLocation()

    return (
        <>
            <Navbar />
            <main className='container mx-auto p-4'>
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path="detail/:id" element={<ProductDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="confirm" element={<OrderConfirm />} />
                </Routes>
            </main>
        </>
    )
}