import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, ShoppingCart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { FaGolang } from "react-icons/fa6";
export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Add your logout logic here
        // For example, clear local storage, reset auth state, etc.
        // Then navigate to the home page
        navigate('/')
    }

    const handleCarts = () => {
        navigate('/products/cart')
    }

    return (
        <header className="flex justify-between items-center mb-8 rounded-md bg-gray-200 py-5 px-10">

            <Link to="/products" className="text-2xl font-bold ">
                <div className='flex items-center'>
                    <FaGolang className='w-11 h-9 mr-2' />
                    Hexagon
                </div>
            </Link>

            <nav className="flex space-x-4">
                <Button variant="ghost" asChild>
                    <Link to="/products">Products</Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link to="/products/about">About</Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link to="/products/contact">Contact</Link>
                </Button>
            </nav>
            <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={handleCarts}>
                    <ShoppingCart className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="ml-4 cursor-pointer">
                            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1253/1253756.png" alt="customer" />
                            <AvatarFallback>Mr</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='cursor-pointer'>
                        <DropdownMenuItem onSelect={handleLogout} className='cursor-pointer'>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}