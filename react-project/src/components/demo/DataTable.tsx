import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Trash2, Pencil } from 'lucide-react';


const initialTableData = [
    { id: 1, name: 'John Doe', addrress: 'Jl. Narogoing No.54', phone: '08921372832' },
    { id: 2, name: 'Jane Smith', addrress: 'Jl. Cerita cinta', phone: '0829137238267' },
    { id: 3, name: 'Bob Johnson', addrress: 'Jl. Kusuma No.23', phone: '0872362323' },
    { id: 4, name: 'Alice Brown', addrress: 'Jl. Narogoing No.54', phone: '08923723' },
    { id: 5, name: 'Charlie Davis', addrress: 'Jl.SetiaBudi No.11', phone: '0892376428' },
    { id: 6, name: 'Eva White', addrress: 'Jl. Cerita cinta', phone: '089652323' },
    { id: 7, name: 'Frank Miller', addrress: 'Jl. Kusuma No.23', phone: '08921738123' },
    { id: 8, name: 'Grace Lee', addrress: 'Jl. Gatot subroto No.98', phone: '0892372732' },
    { id: 9, name: 'Henry Wilson', addrress: 'Jl.Kolmas No.77', phone: '08912371823' },
    { id: 10, name: 'Ivy Taylor', addrress: 'Jl. Narogoing No.54', phone: '0892138232' },
]



interface DataTableProps {
    tableName: string;
    setIsDialogModalOpen: (open: boolean) => void;
    setIsConfirmModalOpen: (open: boolean) => void;
}



export const DataTable = ({ setIsConfirmModalOpen, setIsDialogModalOpen, tableName }: DataTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [tableData] = useState(initialTableData)
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    // for data tables
    const sortedData = useMemo(() => {
        const sortableItems = [...tableData]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [tableData, sortConfig])
    const filteredData = useMemo(() => {
        return sortedData.filter(item =>
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.addrress.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    }, [sortedData, searchTerm,])
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }
    const getSortIcon = (columnName: string) => {
        if (sortConfig?.key === columnName) {
            return sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
        }
        return <ArrowUpDown className="h-4 w-4" />
    }
    return (
        <div>
            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className='flex justify-between'>
                            <div className='flex '>
                                {tableName}
                            </div>
                            <div className='flex '>
                                <Button
                                    onClick={() => setIsDialogModalOpen(true)}
                                >
                                    Add Data
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
                            <Input
                                type="text"
                                placeholder="Search ..."
                                className="max-w-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="flex space-x-2">
                                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Items per page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5 per page</SelectItem>
                                        <SelectItem value="10">10 per page</SelectItem>
                                        <SelectItem value="20">20 per page</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Table>
                            {/* table head */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => requestSort('name')} className="cursor-pointer">
                                        Name {getSortIcon('name')}
                                    </TableHead>
                                    <TableHead onClick={() => requestSort('address')} className="cursor-pointer">
                                        Address {getSortIcon('address')}
                                    </TableHead>
                                    <TableHead onClick={() => requestSort('phone')} className="cursor-pointer">
                                        Phone {getSortIcon('phone')}
                                    </TableHead>
                                    <TableHead className="cursor-pointer">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            {/* table data content  */}
                            <TableBody>
                                {currentItems.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.addrress}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>
                                            <div className='flex space-x-2'>
                                                <Button
                                                    onClick={() => setIsConfirmModalOpen(true)}
                                                    className='bg-red-600 hover:bg-red-800'
                                                >
                                                    <Trash2 className='w-5 h-5 text-white' />
                                                </Button>
                                                <Button
                                                    onClick={() => setIsConfirmModalOpen(true)}
                                                >
                                                    <Pencil className='w-5 h-5' />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* footer table */}
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}