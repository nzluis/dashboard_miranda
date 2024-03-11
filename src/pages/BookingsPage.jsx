import { DashBoard } from '../style/DashBoardStyled'
import DataTable from '../components/DataTable'
import { useEffect, useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { allBookings } from '../features/bookings/bookingsSlice';
import { fetchBookings } from '../features/bookings/bookingsThunk';
import { LinearProgress } from '@mui/material';



export default function Bookings() {
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

    const [open, setOpen] = useState(false);
    const handleOpen = (e, message) => {
        e.stopPropagation()
        setSelectedNote(message)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const [selectedNote, setSelectedNote] = useState('')
    const dispatch = useDispatch()
    const bookings = useSelector(allBookings)
    const [fetched, setFetched] = useState(false)
    const initialFetch = async () => {
        await dispatch(fetchBookings())
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])

    return (
        <DashBoard>
            {fetched ? <DataTable data={bookings} columns={columns} /> : <LinearProgress />}
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>

    )
}