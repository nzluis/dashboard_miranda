import { Form, FormRow } from "../style/FormStyled";
import { useEffect, useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, fetchBookingById, updateBooking } from "../features/bookings/bookingsThunk";
import { useParams } from "react-router-dom";
import { bookingsByIdData } from "../features/bookings/bookingsSlice";
import { LinearProgress } from "@mui/material";

export default function FormBookingPage() {
    const bookingData = useSelector(bookingsByIdData)
    const [firstName, setFirstName] = useState(bookingData.first_name || undefined)
    const [lastName, setLastName] = useState(bookingData.last_name || undefined)
    const [checkIn, setCheckIn] = useState(bookingData.check_in || Date.now())
    const [checkOut, setCheckOut] = useState(bookingData.check_out || Date.now())
    const [request, setRequest] = useState(bookingData.request || undefined)
    const [roomType, setRoomType] = useState(bookingData.room_type || 'Single Bed')
    const [status, setStatus] = useState(bookingData.status || 'In Progress')
    const [roomNumber, setRoomNumber] = useState(bookingData.room_number || undefined)
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(bookingData)
    const [fetched, setFetched] = useState(false)
    if (id) {
        const initialFetch = async () => {
            await dispatch(fetchBookingById(Number(id)))
            setFetched(true)
        }

        useEffect(() => {
            initialFetch()
        }, [])

        if (!fetched) return <LinearProgress />
    }
    const newBooking = {
        id: Math.round(Math.random() * 1000),
        first_name: firstName,
        last_name: lastName,
        order_date: new Date(Date.now()).getTime(),
        check_in: new Date(checkIn).getTime(),
        check_out: new Date(checkOut).getTime(),
        request,
        room_type: roomType,
        room_number: roomNumber,
        status,
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (id) {
            dispatch(updateBooking(newBooking))
        } else {
            console.log(newBooking)
            dispatch(createBooking(newBooking))
        }
    }

    return (
        <DashBoard>
            <Form>
                <label htmlFor="first_name">First Name:
                    <input

                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="first_name"
                    />
                </label>
                <label htmlFor="last_name">Last Name:
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name="last_name"
                    />
                </label>
                <label htmlFor="check_in">Check In:
                    <input
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        name="check_in"
                        type="date"
                    />
                </label>
                <label htmlFor="check_out">Check Out:
                    <input
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        name="check_out"
                        type="date"
                    />
                </label>
                <label htmlFor="request">Message:
                    <textarea
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        name="request"
                        style={{ height: '125px' }}
                    />
                </label>
                <FormRow>
                    <label htmlFor="room_type">Room Type:
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            name="check_out"
                        >
                            <option value="Dingle Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </label>
                    <label htmlFor="room_number">Room Number:
                        <input
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            name="room_number"
                            type="number"
                        />
                    </label>
                </FormRow>
                <label htmlFor="status">Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        name="status"
                    >
                        <option value="In Progress">In Progress</option>
                        <option value="Check In">Check In</option>
                        <option value="Check Out">Check Out</option>
                    </select>
                </label>
                <ButtonActive onClick={(e) => handleSubmit(e)}>{id ? 'Edit' : 'Send'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}