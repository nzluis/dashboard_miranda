import data from '../assets/data/bookings'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from '../components/DataTable'
import { useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { ButtonActive } from '../style/ButtonStyled';
import { useNavigate } from 'react-router-dom';

export default function Bookings() {
    const [open, setOpen] = useState(false);
    const handleOpen = (e, message) => {
        e.stopPropagation()
        setSelectedNote(message)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const [selectedNote, setSelectedNote] = useState('')
    const navigate = useNavigate()
    const columns = [
        {
            label: "Guest",
            display: row =>
                <div>
                    <p>{row.first_name}{' '}{row.last_name}</p>
                    <p className='panelColor'># {row.id}</p>
                </div>
        },
        {
            label: 'Order Date',
            display: row =>
                <div className='lighter'>
                    {new Date(Number(row.order_date)).toString().slice(0, 21)}
                </div>
        },
        {
            label: 'Check In',
            display: row => new Date(Number(row.check_in)).toDateString()
        },
        {
            label: 'Check Out',
            display: row => new Date(Number(row.check_out)).toDateString()
        },
        {
            label: 'Special Request',
            display: row =>
                <>
                    <div
                        className="request"
                        onClick={(e) => handleOpen(e, row.request)}
                    >
                        View Notes
                    </div>
                </>
        },
        {
            label: 'Room Type',
            property: 'room_type'
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Check In' ? "bookingStatus green" :
                                row.status === 'Check Out' ? "bookingStatus red" :
                                    row.status === 'In Progress' ? "bookingStatus yellow" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        }
    ]

    return (
        <DashBoard>
            <ButtonActive style={{ marginBottom: '20px' }} onClick={() => navigate('/bookings/new-booking')}>+ New Booking</ButtonActive>
            <DataTable data={data} columns={columns} />
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>

    )
}