import { Alert } from '@/components/demo/Alert';
import { ConfirmDialog } from '@/components/demo/ConfirmDialog';
import { DataTable } from '@/components/demo/DataTable'
import { DialogDetail } from '@/components/demo/DetailDialog';
import { DialogModal } from '@/components/demo/DialogModal';
import { ReportTest } from '@/components/demo/ReportTest'
import { createProducts, deleteProducts, getProducts, updateProducts } from '@/service/product-service';
import { formatDateForInput } from '@/utils/format-date';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


interface Products {
    product_id: number;
    name: string;
    description: string
    rating: number
    stock: number
    price: number
    date: string
}

export const Dashboard = () => {
    const [isDialogDetailOpen, setIsDialogDetailOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null)

    const showAlert = (message: string, type: 'success' | 'error') => {
        setAlertMessage({ message, type })
        setTimeout(() => {
            setAlertMessage(null)
        }, 2000)
    }

    const [selectedProductId, setSelectedProductId] = useState<number>(0)
    const [productData, setProductData] = useState<Products[]>([])

    // edit data
    const [editingProducts, setEditingProducts] = useState<Products | null>(null)


    // input form data
    const fields = [
        { id: 'name', label: 'Name', type: 'text' as const },
        { id: 'description', label: 'Description', type: 'text' as const },
        { id: 'stock', label: 'Stock', type: 'number' as const },
        { id: 'price', label: 'Price', type: 'number' as const },
        { id: 'date', label: 'Date', type: 'date' as const },
    ]
    // coloum table
    const columns = [
        { key: 'name', header: 'Product Name', sortable: true },
        { key: 'description', header: 'Description', sortable: true },
        { key: 'stock', header: 'Stock', sortable: true },
        { key: 'price', header: 'Price', sortable: true },
        { key: 'date', header: 'Date', sortable: true },
    ]

    const actions = [
        {
            onClick: (row: Products) => {
                setSelectedProductId(row.product_id)
                setIsDialogDetailOpen(true)
            },
            icon: <Eye className='w-5 h-5 text-white' />,
            className: 'bg-gray-600 hover:bg-gray-800'
        },
        {
            onClick: (row: Products) => {
                setSelectedProductId(row.product_id)
                setIsConfirmModalOpen(true)
            },
            icon: <Trash2 className='w-5 h-5 text-white' />,
            className: 'bg-red-600 hover:bg-red-800'
        },
        {
            onClick: (row: Products) => {
                setEditingProducts(row)
                setIsDialogModalOpen(true)

            },
            icon: <Pencil className='w-5 h-5' />,
        }
    ]

    useEffect(() => {
        fetchProduct()
    }, [])

    // get data
    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await getProducts()
            if (response.statusCode === 200) {
                setProductData(response.data as Products[])
            }
        } catch (error) {
            showAlert('Failed to fetch products', 'error')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // add and edit action
    const handleSubmit = async (formData: Record<string, string>) => {
        try {
            const productsData = {
                name: formData.name,
                description: formData.description,
                stock: parseInt(formData.stock, 10),
                rating: parseFloat(formData.rating),
                price: parseFloat(formData.price),
                date: formData.date
            }
            let response;

            if (editingProducts) {
                response = await updateProducts(editingProducts.product_id, productsData)
            } else {
                response = await createProducts(productsData)
            }
            if (response.statusCode === 200) {
                console.log("Products Update success", response.data)
                setIsDialogModalOpen(false)
                setEditingProducts(null)
                showAlert('Products update successfully', 'success')
                fetchProduct()
            } else {
                console.log("Products Create success", response.data)
                setIsDialogModalOpen(false)
                setEditingProducts(null)
                showAlert('Products Create successfully', 'success')
                fetchProduct()
            }
        } catch (error) {
            console.error(`Error Products:`, error)
            showAlert('Failed Error. Please try again.', 'error')

        }
    }


    const handleDelete = async () => {
        try {
            const response = await deleteProducts(selectedProductId)
            if (response.statusCode === 200) {
                console.log('Products deleted successfully:', response.data)
                setIsConfirmModalOpen(false)
                showAlert('Products delete successfully', 'success')
                fetchProduct()
            }
        } catch (error) {
            console.error('Error deleting products:', error)
            showAlert('Failed to delete products. Please try again.', 'error')
        }
    }



    return (
        <>
            {/* <Navbar /> */}
            <main className='container mx-auto p-4'>
                <ReportTest />
                <div className='pt-20'>
                    {loading ? (
                        <div className='flex w-full p-20 items-center justify-center '>Loading...</div>
                    ) : (
                        <DataTable
                            tableName="Data Products"
                            columns={columns}
                            data={productData}
                            actions={actions}
                            onAddNew={() => {
                                setEditingProducts(null)
                                setIsDialogModalOpen(true)
                            }}
                        />
                    )}
                </div>
            </main>

            {/* dialog Detail */}
            <DialogDetail
                setIsDialogDetailOpen={setIsDialogDetailOpen}
                isDialogDetailOpen={isDialogDetailOpen}
                selectedProductId={selectedProductId}
            />

            {/* delete */}
            <ConfirmDialog
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                IsConfirmModalOpen={isConfirmModalOpen}
                handleActionDelete={handleDelete}
            />

            {/* input or edit data */}
            <DialogModal
                isOpen={isDialogModalOpen}
                onOpenChange={setIsDialogModalOpen}
                title={editingProducts ? "Edit Products" : "Add New Products"}
                description={editingProducts ? "Edit the Products information below" : "Fill out the form below to add a new Products to the system"}
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonText={editingProducts ? "Update Products" : "Add Products"}
                initialData={editingProducts ? { ...editingProducts, date: formatDateForInput(editingProducts.date) } : {}}
            />

            {alertMessage && (
                <Alert
                    message={alertMessage.message}
                    type={alertMessage.type}
                    onClose={() => setAlertMessage(null)}
                />
            )}
        </>
    )
}
