import data from '../../data.json'
import Table from '../components/Table'

function Bookings() {
    const columns = [
        {
            label: "Guest",
            display: row => `${row.first_name} ${row.last_name}`
        },
        {
            label: 'Order Date',
            property: 'order_date'
        },
        {
            label: 'Check In',
            property: 'check_in'
        },
        {
            label: 'Check Out',
            property: 'check_out'
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
        <Table data={data} columns={columns} />
    )
}

export default Bookings