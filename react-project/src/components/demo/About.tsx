import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Rocket, Target } from 'lucide-react'

export const About = () => {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center mb-8">About </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Rocket className="mr-2 text-blue-500" />
                                Our Mission
                            </h2>
                            <p className="text-gray-600">
                                At Go Hexagon, we're on a mission to revolutionize the way people interact with technology.
                                We believe in creating intuitive, powerful, and beautiful solutions that make life easier and more enjoyable for our users.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Target className="mr-2 text-green-500" />
                                Our Vision
                            </h2>
                            <p className="text-gray-600">
                                We envision a world where technology seamlessly integrates into everyday life, enhancing human capabilities and fostering innovation.
                                Go Hexagon aims to be at the forefront of this technological revolution, driving positive change in society.
                            </p>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </>
    )
}