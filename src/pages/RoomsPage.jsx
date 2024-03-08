import rooms from '../assets/data/rooms.json'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { useNavigate } from 'react-router-dom'
import { ButtonActive } from '../style/ButtonStyled'

export default function Rooms() {
    const navigate = useNavigate()

    const columns = [
        {
            label: "Room Name",
            display: row =>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <img src={row.photo} />
                    <div>
                        <p className='panelColor'># {row.id}</p>
                        {row.room_number}
                    </div>
                </div>
        },
        {
            label: 'Room Type',
            property: 'room_type'
        },
        {
            label: 'Amenities',
            display: row =>
                <div className='twoLines'>
                    <p>{row.amenities.slice(0, 65)}</p>
                </div>
        },
        {
            label: 'Price',
            display: row =>
                <div>
                    <span className='highlight'>{row.price}</span><span className='panelColor'>/Night</span>
                </div>
        },
        {
            label: 'Offer',
            display: row =>
                <div>
                    <span className='highlight'>{row.offer_price}</span><span className='panelColor'>/Night</span>
                </div>
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Available' ? "bookingStatus green" :
                                row.status === 'Booked' ? "bookingStatus red" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        },
    ]
    return (
        <DashBoard>
            <ButtonActive style={{ marginBottom: '20px' }} onClick={() => navigate('/rooms/new-room')}>+ New Room</ButtonActive>
            <DataTable data={rooms} columns={columns} position={'bottom'} />
        </DashBoard>

    )
}