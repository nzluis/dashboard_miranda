import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"
import { CheckDatesBox, LeftSide, RightSide } from "../style/BookingDetailStyled"
import { bookingByIdData } from "../features/bookings/bookingsSlice";
import { useEffect, useMemo, useState } from "react";
import { fetchBookingById } from "../features/bookings/bookingsThunk";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/rooms/roomsThunk";
import { roomsData } from "../features/rooms/roomsSlice";

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default function BookingDetail() {
    const { id } = useParams()
    const bookingData = useSelector(bookingByIdData)
    const rooms = useSelector(roomsData)
    const daysBetween = useMemo(() => {
        if (bookingData)
            return Math.ceil(Math.abs(bookingData.check_out - bookingData.check_in) / 1000 / 60 / 60 / 24)
    }, [bookingData])
    const room = useMemo(() => {
        if (rooms && bookingData) {

            return rooms.find(room => room.room_type == bookingData.room_type)
        }
    }, [rooms])

    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)
    const initialFetch = async () => {
        await dispatch(fetchBookingById(id)).unwrap()
        await dispatch(fetchRooms()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])
    if (!fetched || !room) return <LinearProgress />

    return (
        <DashBoard $flex>
            <LeftSide>
                <h1>{bookingData.first_name} {bookingData.last_name}</h1>
                <p>{bookingData.id}</p>
                <CheckDatesBox>
                    <CheckDatesBox $insidebox>
                        <h5>Check In</h5>
                        <p>{new Date(Number(bookingData.check_in)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                    <CheckDatesBox $insidebox>
                        <h5>Check Out</h5>
                        <p>{new Date(Number(bookingData.check_out)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                </CheckDatesBox>
                <p>{bookingData.room_number}</p>
                <p>{bookingData.price}</p>
                <p>{room.request}</p>
                <p>{room.price * daysBetween} <span>$ </span></p>
                <p>{room.amenities.join(', ')}</p>
            </LeftSide>

            <RightSide>
                <img src="../../public/room1.jpg" />
                <p>{room.room_type}</p>
                <p>{room.description}</p>
                <p>{room.status}</p>
            </RightSide>
        </DashBoard>
    )
}