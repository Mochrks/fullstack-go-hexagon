import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { Mail, Globe, Linkedin, Github } from 'lucide-react'

export const Contact = () => {
    return (
        <>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center mb-8">Contact me</h2>
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-6">
                        <div className="grid gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Mail className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Email</h2>
                                    <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">
                                        mochrizkiks@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-200 p-3 rounded-full">
                                    <Globe className="text-gray-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Website</h2>
                                    <a href="https://mochrks.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        my-website
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-200 p-3 rounded-full">
                                    <Github className="text-gray-500" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Github</h2>
                                    <a href="https://github.com/Mochrks" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Github
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Linkedin className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Linked in</h2>
                                    <a href="https://www.linkedin.com/in/mochrks/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        mochrks
                                    </a>
                                </div>
                            </div>




                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}