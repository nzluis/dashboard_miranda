import data from '../../data.json'

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
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => <th key={index}>{column.label}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => {
                        return <tr key={index}>
                            {columns.map((column, i) => {
                                return (
                                    <td key={i}>
                                        {row[column.property] ? row[column.property] : column.display(row)}
                                    </td>
                                )
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Bookings