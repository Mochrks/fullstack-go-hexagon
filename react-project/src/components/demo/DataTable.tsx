import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface Column {
    key: string
    header: string
    sortable?: boolean
    render?: (value: any, row: any) => React.ReactNode
}

interface Action {
    onClick: (row: any) => void
    icon?: React.ReactNode
    className?: string
}

interface DataTableProps {
    tableName: string
    columns: Column[]
    data: any[]
    actions?: Action[]
    onAddNew?: () => void
}

export const DataTable = ({ tableName, columns, data, actions, onAddNew }: DataTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const sortedData = useMemo(() => {
        const sortableItems = [...data]
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
    }, [data, sortConfig])

    const filteredData = useMemo(() => {
        return sortedData.filter(item =>
            columns.some(column =>
                String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [sortedData, searchTerm, columns])

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
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between'>
                    <div>{tableName}</div>

                    <Button onClick={onAddNew}>
                        Add New
                    </Button>

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

                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    onClick={() => column.sortable && requestSort(column.key)}
                                    className={column.sortable ? "cursor-pointer" : ""}
                                >
                                    {column.header} {column.sortable && getSortIcon(column.key)}
                                </TableHead>
                            ))}
                            {actions && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <div className='flex space-x-2'>
                                            {actions.map((action, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => action.onClick(row)}
                                                    className={action.className}
                                                >
                                                    {action.icon}
                                                </Button>
                                            ))}
                                        </div>
                                    </TableCell>
                                )}


                            </TableRow>
                        ))}



                    </TableBody>

                </Table>

                {currentItems.length === 0 && (
                    <>
                        <div className='w-full flex items-start justify-center px-10 py-10'>Data kosong</div>
                    </>
                )}

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
    )
}