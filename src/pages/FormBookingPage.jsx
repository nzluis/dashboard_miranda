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
    const dispatch = useDispatch()
    const { id } = useParams()
    const [fetched, setFetched] = useState(false)
    const booking = {
        id: Math.round(Math.random() * 1000),
        first_name: '',
        last_name: '',
        order_date: new Date(Date.now()).getTime(),
        check_in: '',
        check_out: '',
        request: '',
        room_type: 'Single Bed',
        room_number: '',
        status: 'In Progress'
    }


    const [formData, setFormData] = useState({
        id: Math.round(Math.random() * 1000),
        first_name: '',
        last_name: '',
        order_date: new Date(Date.now()).getTime(),
        check_in: '',
        check_out: '',
        request: '',
        room_type: 'Single Bed',
        room_number: '',
        status: 'In Progress'
    })

    const initialFetch = async () => {
        await dispatch(fetchBookingById(Number(id))).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        if (id) initialFetch()
    }, [])

    useEffect(() => {
        if (id && booking) setFormData(booking)
    }, [booking])

    if (!fetched && id) return <LinearProgress />

    function handleChange(e) {
        const { name, value, type } = e.target
        if (type === 'date') setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
        else setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createBooking(formData))
    }

    console.log(formData)
    return (
        <DashBoard>
            <Form>
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
                            value={formData.room_type}
                            onChange={handleChange}
                            name="check_out"
                        >
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </label>
                    <label htmlFor="room_number">Room Number:
                        <input
                            value={formData.room_number}
                            onChange={handleChange}
                            name="room_number"
                            type="number"
                        />
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
                <ButtonActive onClick={(e) => handleSubmit(e)}>{id ? 'Edit' : 'Send'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}