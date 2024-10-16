import { DataTable } from '@/components/demo/DataTable'
import { Navbar } from '@/components/demo/Navbar'
import { ReportTest } from '@/components/demo/ReportTest'

export const Dashboard = () => {
    return (
        <>
            <Navbar />
            <main className='container mx-auto p-4'>
                <ReportTest />
                <div className='pt-20'>
                    <DataTable
                        tableName='Data Products'
                    />
                </div>
            </main>
        </>
    )
}
