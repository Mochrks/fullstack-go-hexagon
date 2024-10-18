import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import { Search, FileDown, Settings } from 'lucide-react'
import { formatTimestamp } from '@/utils/format-date'
import { getSpeed } from '@/service/log-speed'


interface Data {
    id: string
    path: string
    duration: number
    method: string
    timestamp: string
}

export const ReportTest = () => {
    const [data, setData] = useState<Data[]>([])
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [pdfTitle, setPdfTitle] = useState('Function Data')
    const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    // Fetch data dari API
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await getSpeed()
            console.log("API response:", response)

            if (Array.isArray(response.data)) {
                const transformedData = response.data.map((item: any) => ({
                    id: item.ID,
                    path: item.Path,
                    duration: item.Duration,
                    method: item.Method,
                    timestamp: item.Timestamp
                }))
                setData(transformedData)
            } else {
                console.error("Data is not array:", response.data)
            }
        } catch (error) {
            console.error("Error fetching speed data:", error)
        }
    }


    const handleRowSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        setSelectedRows(selectedRows.length === data.length ? [] : data.map(row => row.id))
    }

    const filteredData = data.filter(row =>
        row.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.duration.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: pdfOrientation,
            unit: 'pt'
        })

        doc.setFontSize(20)
        doc.text(pdfTitle, 40, 40)

        const tableData = filteredData
            .filter(row => selectedRows.includes(row.id))
            .map((row, index) => [
                index + 1,
                row.path,
                row.duration,
                row.method,
                formatTimestamp(row.timestamp)
            ])

        autoTable(doc, {
            head: [['No.', 'Endpoint Path', 'Time Duration Speed', 'Method', 'Date']],
            body: tableData,
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 8,
                lineColor: [75, 75, 75],
                lineWidth: 0.5,
            },
            headStyles: {
                fillColor: [52, 73, 94],
                textColor: 255,
                fontSize: 12,
                fontStyle: 'bold',
                halign: 'center',
            },
            bodyStyles: {
                textColor: [44, 62, 80],
            },
            alternateRowStyles: {
                fillColor: [241, 245, 249],
            },
            columnStyles: {
                0: { cellWidth: 40, halign: 'center' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 100, halign: 'center' },
                3: { cellWidth: 80, halign: 'center' },
            },
        })

        doc.save('function_data.pdf')
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // current page
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    return (
        <div className="container mx-auto pt-20">
            <h1 className="text-3xl font-bold mb-6">Report Speed Test Functionality</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className='space-x-5'>
                    <Button
                        onClick={generatePDF}
                        className="mt-4"
                        disabled={selectedRows.length === 0}
                    >
                        <FileDown className="mr-2 h-4 w-4" /> Generate PDF
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> PDF Settings</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>PDF Settings</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pdfTitle">Title</Label>
                                    <Input
                                        id="pdfTitle"
                                        value={pdfTitle}
                                        onChange={(e) => setPdfTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pdfOrientation">Orientation</Label>
                                    <Select
                                        onValueChange={(value: 'portrait' | 'landscape') => setPdfOrientation(value)}
                                        defaultValue={pdfOrientation}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Orientation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="portrait">Portrait</SelectItem>
                                            <SelectItem value="landscape">Landscape</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-200 hover:bg-gray-300'>
                        <TableHead className="w-[40px]">
                            <Checkbox
                                checked={selectedRows.length === filteredData.length}
                                onCheckedChange={handleSelectAll}
                            />
                        </TableHead>
                        <TableHead>No.</TableHead>
                        <TableHead>Endpoint Path</TableHead>
                        <TableHead >Method</TableHead>
                        <TableHead>Time Duration Speed</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((row, index) => (
                        <TableRow key={row.id} className="hover:bg-gray-50">
                            <TableCell>
                                <Checkbox
                                    checked={selectedRows.includes(row.id)}
                                    onCheckedChange={() => handleRowSelect(row.id)}
                                />
                            </TableCell>
                            <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell> {/* Menyesuaikan penomoran dengan halaman */}
                            <TableCell className="font-medium">{row.path}</TableCell>
                            <TableCell>{row.method}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>{formatTimestamp(row.timestamp)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
                </span>
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                    variant="outline"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
