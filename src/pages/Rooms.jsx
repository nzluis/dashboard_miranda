import rooms from '../assets/data/rooms.json'
import { DashBoard } from '../assets/styled Components/DashBoard'
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
        <DashBoard>
            <h1>Rooms</h1>
            <DataTable data={rooms} columns={columns} />
        </DashBoard>

    )
}