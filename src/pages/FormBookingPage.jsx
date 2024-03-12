import { Form, FormRow } from "../style/FormStyled";
import { useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";

export default function FormBookingPage() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [request, setRequest] = useState()
    const [roomType, setRoomType] = useState()
    const [status, setStatus] = useState()
    const [roomNumber, setRoomNumber] = useState()

    const newBooking = {
        id: Math.random() * 1000,
        first_name: firstName,
        last_name: lastName,
        order_date: new Date(Date.now()),
        check_in: checkIn,
        check_out: checkOut,
        request,
        room_type: roomType,
        room_number: roomNumber,
        status,
    }

    function handleSubmit(e) {
        e.preventDefault()
        alert(`
            Booking registered successfuly:
                ${newBooking.first_name} ${newBooking.last_name}
                From ${newBooking.check_in} to ${newBooking.check_out}
        `)
    }

    return (
        <DashBoard>
            <Form>
                <label htmlFor="firs_name">First Name:
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
                            <option value="single_bed">Single Bed</option>
                            <option value="double_bed">Double Bed</option>
                            <option value="double_superior">Double Superior</option>
                            <option value="suite">Suite</option>
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
                        <option value="check_in">Check In</option>
                        <option value="check_out">Check Out</option>
                        <option value="in_progress">In Progress</option>
                    </select>
                </label>
                <ButtonActive onClick={(e) => handleSubmit(e)}>Send</ButtonActive>
            </Form>
        </DashBoard>
    )
}