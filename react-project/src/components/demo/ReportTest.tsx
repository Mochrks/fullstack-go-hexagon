import React, { useState } from 'react'
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

interface FunctionData {
    id: number
    name: string
    speed: string
    category: string
}

const initialData: FunctionData[] = [
    { id: 1, name: "quickSort", speed: "O(n log n)", category: "Sorting" },
    { id: 2, name: "bubbleSort", speed: "O(n^2)", category: "Sorting" },
    { id: 3, name: "binarySearch", speed: "O(log n)", category: "Searching" },
    { id: 4, name: "depthFirstSearch", speed: "O(V + E)", category: "Graph" },
    { id: 5, name: "breadthFirstSearch", speed: "O(V + E)", category: "Graph" },
]

export const ReportTest = () => {
    const [data, setData] = useState<FunctionData[]>(initialData)
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [pdfTitle, setPdfTitle] = useState('Function Data')
    const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait')

    const handleRowSelect = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        setSelectedRows(selectedRows.length === data.length ? [] : data.map(row => row.id))
    }

    const filteredData = data.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.speed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            .map(row => [row.id.toString(), row.name, row.speed, row.category])

        autoTable(doc, {
            head: [['No.', 'Function Name', 'Time Complexity', 'Category']],
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
            didParseCell: function (data) {
                const col = data.column.index;
                if (col === 1 && data.row.section === 'body') {
                    data.cell.styles.fontStyle = 'bold';
                }
                if (col === 2 && data.row.section === 'body') {
                    data.cell.styles.textColor = [231, 76, 60];
                }
            },
            didDrawCell: function (data) {
                if (data.row.section === 'body') {
                    const col = data.column.index;
                    const row = data.row.index;
                    const width = data.cell.width;
                    const height = data.cell.height;
                    if (col === 3) {
                        doc.setFillColor(52, 152, 219);
                        doc.rect(data.cell.x + 2, data.cell.y + 2, width - 4, height - 4, 'F');
                        doc.setTextColor(255);
                        doc.text(data.cell.text, data.cell.x + width / 2, data.cell.y + height / 2, {
                            align: 'center',
                            baseline: 'middle'
                        });
                    }
                }
            },
        })

        doc.save('function_data.pdf')
    }

    return (
        <div className="container mx-auto p-4">
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>PDF Export Settings</DialogTitle>

                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="pdfTitle" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        id="pdfTitle"
                                        value={pdfTitle}
                                        onChange={(e) => setPdfTitle(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="pdfOrientation" className="text-right">
                                        Orientation
                                    </Label>
                                    <Select
                                        onValueChange={(value: 'portrait' | 'landscape') => setPdfOrientation(value)}
                                        defaultValue={pdfOrientation}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select orientation" />
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

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedRows.length === filteredData.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>No.</TableHead>
                            <TableHead>Function Name</TableHead>
                            <TableHead>Time Complexity</TableHead>
                            <TableHead>Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(row.id)}
                                        onCheckedChange={() => handleRowSelect(row.id)}
                                    />
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell className="font-medium">{row.name}</TableCell>
                                <TableCell>{row.speed}</TableCell>
                                <TableCell>{row.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}