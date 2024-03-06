import rooms from '../../rooms.json'
import DataTable from "../components/DataTable"

export default function Rooms() {
    const columns = [
        {
            label: "Room Name",
            display: row =>
                <div style={{ display: 'flex' }}>
                    <img src={row.photo} />
                    <div>
                        <p>{row.id}</p>
                        <p>{row.room_number}</p>
                    </div>
                </div>
        },
        {
            label: 'Room Type',
            property: 'room_type'
        },
        {
            label: 'Amenities',
            display: row => `${row.amenities.slice(0, 10)} ...`
        },
        {
            label: 'Price',
            property: 'price'
        },
        {
            label: 'Offer',
            property: 'offer_price'
        },
        {
            label: 'Status',
            property: 'status'
        },
    ]
    return (
        <div style={{ overflow: 'scroll' }}>
            <h1>Rooms</h1>
            <DataTable data={rooms} columns={columns} />
        </div>

    )
}