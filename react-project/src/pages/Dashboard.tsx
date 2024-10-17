import { DataTable } from '@/components/demo/DataTable'
import { Navbar } from '@/components/demo/Navbar'
import { ReportTest } from '@/components/demo/ReportTest'
import { getProducts } from '@/service/product-service';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


interface Products {
    product_id: number;
    name: string;

}

export const Dashboard = () => {
    const [selectedProductId, setSelectedProductId] = useState<number>(0)
    const [productData, setProductData] = useState<Products[]>([])
    const [loading, setLoading] = useState(true)
    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null)
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)


    // edit data
    const [editingProducts, setEditingProducts] = useState<Products | null>(null)

    // coloum table
    const columns = [
        { key: 'name', header: 'Name', sortable: true },
        { key: 'address', header: 'Address', sortable: true },
        { key: 'phone', header: 'Phone', sortable: true },
    ]

    const actions = [
        {
            onClick: (row: Products) => {
                selectedProductId(row.product_id)

            },
            icon: <Trash2 className='w-5 h-5 text-white' />,
            className: 'bg-red-600 hover:bg-red-800'
        },
        {
            onClick: (row: Products) => {
                // setEditingCustomer(row)

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
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            {/* <Navbar /> */}
            <main className='container mx-auto p-4'>
                <ReportTest />
                <div className='pt-20'>
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
                </div>
            </main>
        </>
    )
}
