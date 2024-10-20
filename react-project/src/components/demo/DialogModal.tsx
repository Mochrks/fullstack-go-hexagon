import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormField {
    id: string
    label: string
    type: 'text' | 'number' | 'email' | 'password' | 'date' | 'select'
    options?: { value: string; label: string }[]
}

interface DialogModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    fields: FormField[]
    onSubmit: (formData: Record<string, string>) => void
    submitButtonText: string
    initialData?: Record<string, string>
}



export const DialogModal = ({
    isOpen,
    onOpenChange,
    title,
    description,
    fields,
    onSubmit,
    submitButtonText,
    initialData = {}
}: DialogModalProps) => {
    const [formData, setFormData] = useState<Record<string, string>>(initialData)

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData)
        } else {
            setFormData({})
        }
    }, [isOpen, initialData])

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={field.id} className="text-left">
                                    {field.label}
                                </Label>
                                {field.type === 'select' ? (
                                    <Select
                                        onValueChange={(value) => handleInputChange(field.id, value)}
                                        defaultValue={formData[field.id] || ''}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder={`Select ${field.label}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className="col-span-3"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full">{submitButtonText}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
