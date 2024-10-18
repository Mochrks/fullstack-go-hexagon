
import { useState, useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertProps {
    message: string
    type: string
    onClose: () => void
}

export const Alert = ({ message, onClose, type }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 2000)
    }


    const getAlertStyles = () => {
        if (type === 'success') {
            return 'bg-green-100 border border-green-400 text-green-700'
        } else if (type === 'error') {
            return 'bg-red-100 border border-red-400 text-red-700'
        }

        return ''
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`fixed top-4 right-5 w-full z-50 max-w-xl px-4 py-3 rounded-lg shadow-lg ${getAlertStyles()}`}
                    role="alert"
                >
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <strong className="font-bold mr-2">{type === 'error' ? 'Error!' : 'Success!'}</strong>
                        <span className="block sm:inline">{message}</span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="absolute top-0 right-0 px-4 py-3"
                    >
                        <X className="h-5 w-5 text-black" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}