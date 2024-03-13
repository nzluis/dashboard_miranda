import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"
import { CheckDatesBox, LeftSide, RightSide } from "../style/BookingDetailStyled"
import { bookingByIdData } from "../features/bookings/bookingsSlice";
import { useEffect, useState } from "react";
import { fetchBookingById } from "../features/bookings/bookingsThunk";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default function BookingDetail() {
    const { id } = useParams()
    const bookingData = useSelector(bookingByIdData)
    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)


    const initialFetch = async () => {
        await dispatch(fetchBookingById(Number(id)))
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])

    if (!fetched) return <LinearProgress />

    return (
        <DashBoard flex>
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
                <p>{bookingData.room_type}</p>
                <p>{bookingData.price}</p>
                <p>{bookingData.description}</p>
                <p>{bookingData.price}$</p>
                <p>Servicios</p>
            </LeftSide>

            <RightSide>
                <p>carusel de fotos</p>
                <p>tipo de hbaitacion</p>
                <p>descripcion habitacion</p>
                <p>estado</p>
            </RightSide>
        </DashBoard>
    )
}