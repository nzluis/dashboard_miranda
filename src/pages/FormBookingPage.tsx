import { Form, FormRow } from "../style/FormStyled";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";
import { createBooking, fetchBookingById, updateBooking } from "../features/bookings/bookingsThunk";
import { useNavigate, useParams } from "react-router-dom";
import { bookingByIdData, clearBookingById } from "../features/bookings/bookingsSlice";
import { LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RoomData } from "../interfaces/Rooms";
import { roomsData } from "../features/rooms/roomsSlice";
import { fetchRooms, updateRoom } from "../features/rooms/roomsThunk";


export default function FormBookingPage() {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [fetched, setFetched] = useState(false)
    const booking = useAppSelector(bookingByIdData)
    const rooms = useAppSelector(roomsData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        order_date: '',
        first_name: '',
        last_name: '',
        check_in: '',
        check_out: '',
        request: '',
        room: {} as RoomData,
        status: 'In Progress'
    })
    const [roomType, setRoomType] = useState('Single Bed')
    const [roomNumber, setRoomNumber] = useState('')
    const availableRooms = useMemo(() => {
        const alreadyAvailableRooms = rooms.filter((room: RoomData) => room.status === 'Available' && room.room_type === roomType)
        if (JSON.stringify(booking) !== '{}') return roomType === booking?.room.room_type ? [...alreadyAvailableRooms, booking?.room] : alreadyAvailableRooms
        return alreadyAvailableRooms
    }, [rooms, roomType])

    const initialFetchAlways = async () => {
        await dispatch(fetchRooms()).unwrap()
    }

    const initialFetchForEdit = async () => {
        await dispatch(fetchBookingById(id!)).unwrap()
    }
    useEffect(() => {
        initialFetchAlways()
        if (id) initialFetchForEdit()
        else setFetched(true)
    }, [])

    useEffect(() => {
        if (id && booking && booking.check_in) {
            setFormData({
                ...booking,
                check_in: new Date(Number(booking.check_in)).toISOString().slice(0, 10),
                check_out: new Date(Number(booking.check_out)).toISOString().slice(0, 10)
            })
            setRoomType(booking.room.room_type)
            setRoomNumber(booking.room.room_number)
            setFetched(true)
        }
    }, [booking])

    useEffect(() => {
        if (roomNumber === '') setRoomNumber(availableRooms.length !== 0 ? availableRooms[0]!.room_number : '')
    }, [roomType])

    function handleChange(e: ChangeEvent<any>) {
        const { name, value } = e.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const selectedRoom = rooms.find((room: RoomData) => room.room_number === roomNumber)
        !id ?
            await dispatch(
                createBooking({
                    ...formData,
                    room: selectedRoom!,
                    order_date: new Date(Date.now()).getTime().toString(),
                    check_in: new Date(formData.check_in).getTime().toString(),
                    check_out: new Date(formData.check_out).getTime().toString()
                })
            ).unwrap()
            :
            await dispatch(
                updateBooking({
                    ...formData,
                    room: selectedRoom!,
                    check_in: new Date(formData.check_in).getTime().toString(),
                    check_out: new Date(formData.check_out).getTime().toString()
                })
            ).unwrap()
        if (booking && booking.room && selectedRoom?.room_number !== booking!.room.room_number)
            await dispatch(updateRoom({
                ...booking!.room,
                status: 'Available'
            }))
        await dispatch(updateRoom({
            ...selectedRoom!,
            status: 'Booked'
        })).then(() => navigate('/bookings'))

    }

    if (!fetched && id) return <LinearProgress />
    return (
        <DashBoard>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:
                    <input

                        value={formData.first_name}
                        onChange={handleChange}
                        name="first_name"
                    />
                </label>
                <label htmlFor="last_name">Last Name:
                    <input
                        value={formData.last_name}
                        onChange={handleChange}
                        name="last_name"
                    />
                </label>
                <label htmlFor="check_in">Check In:
                    <input
                        value={formData.check_in}
                        onChange={handleChange}
                        name="check_in"
                        type="date"
                    />
                </label>
                <label htmlFor="check_out">Check Out:
                    <input
                        value={formData.check_out}
                        onChange={handleChange}
                        name="check_out"
                        type="date"
                    />
                </label>
                <label htmlFor="request">Message:
                    <textarea
                        value={formData.request}
                        onChange={handleChange}
                        name="request"
                        style={{ height: '125px' }}
                    />
                </label>
                <FormRow>
                    <label htmlFor="room_type">Room Type:
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            name="room_type"
                        >
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </label>
                    <label htmlFor="room_number">Room Number:
                        <select
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            name="room_type"
                        >
                            {availableRooms.length !== 0 ? availableRooms.map((room, index) => {
                                return <option key={index} value={room!.room_number}>{room!.room_number}</option>
                            }) :
                                <option value=''>No room available</option>
                            }
                        </select>
                    </label>
                </FormRow>
                <label htmlFor="status">Status:
                    <select
                        value={formData.status}
                        onChange={handleChange}
                        name="status"
                    >
                        <option value="In Progress">In Progress</option>
                        <option value="Check In">Check In</option>
                        <option value="Check Out">Check Out</option>
                    </select>
                </label>
                <ButtonActive type="submit" disabled={availableRooms.length === 0}>{id ? 'Edit' : 'Send'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}