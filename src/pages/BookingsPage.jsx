import data from '../assets/data/bookings'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from '../components/DataTable'

export default function Bookings() {
    const columns = [
        {
            label: "Guest",
            display: row => `${row.first_name} ${row.last_name}`
        },
        {
            label: 'Order Date',
            display: row => new Date(Number(row.order_date)).toLocaleDateString('es-ES')
        },
        {
            label: 'Check In',
            display: row => new Date(Number(row.check_in)).toLocaleDateString('es-ES')
        },
        {
            label: 'Check Out',
            display: row => new Date(Number(row.check_out)).toLocaleDateString('es-ES')
        },
        {
            label: 'Room Type',
            property: 'room_type'
        },
        {
            label: 'Status',
            property: 'status'
        }
    ]

    return (
        <DashBoard>
            <h1>Bookings</h1>
            <DataTable data={data} columns={columns} />
        </DashBoard>

    )
}