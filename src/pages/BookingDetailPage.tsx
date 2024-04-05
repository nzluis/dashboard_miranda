import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"
import { ButtonDetail, CheckDatesBox, FacilitiesCard, FacilitiesContainer, LeftSide, RightSide, RoomBox, SameRowContainer } from "../style/BookingDetailStyled"
import { bookingByIdData } from "../features/bookings/bookingsSlice";
import { useEffect, useMemo, useState } from "react";
import { fetchBookingById } from "../features/bookings/bookingsThunk";
import { LinearProgress } from "@mui/material";
import { fetchRooms } from "../features/rooms/roomsThunk";
import { roomsData } from "../features/rooms/roomsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaSquarePhone } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { FaShower } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";

import 'swiper/css';
import 'swiper/css/navigation';

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

// const MILISECONDS_IN_A_DAY = 1000 / 60 / 60 / 24

export default function BookingDetail() {
    const { id } = useParams()
    const bookingData = useAppSelector(bookingByIdData)
    const rooms = useAppSelector(roomsData)
    // const daysBetween = useMemo(() => {
    //     if (bookingData)
    //         return Math.ceil(Math.abs(parseInt(bookingData.check_out) - parseInt(bookingData.check_in)) / MILISECONDS_IN_A_DAY)
    // }, [bookingData])
    const room = useMemo(() => {
        if (rooms && bookingData) {

            return rooms.find(room => room.room_type == bookingData.room_type)
        }
    }, [rooms])

    const dispatch = useAppDispatch()
    const [fetched, setFetched] = useState(false)
    const initialFetch = async () => {
        await dispatch(fetchBookingById(id!)).unwrap()
        await dispatch(fetchRooms()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])
    if (!fetched || !bookingData || !room) return <LinearProgress />

    return (
        <DashBoard $flex>
            <LeftSide>
                <h1>{bookingData!.first_name} {bookingData!.last_name}</h1>
                <p>{bookingData!.id}</p>
                <SameRowContainer>
                    <ButtonDetail><FaSquarePhone size={20} /><a href={`https://wa.me/7765075874`}>(776) 5075874</a></ButtonDetail>
                    <ButtonDetail><BiSolidMessageSquareDetail size={20} /><a href="mailto:mrowlyv@biglobe.ne.jp">mrowlyv@biglobe.ne.jp</a></ButtonDetail>
                </SameRowContainer>
                <CheckDatesBox>
                    <CheckDatesBox $insidebox>
                        <h5>Check In</h5>
                        <p>{new Date(Number(bookingData!.check_in)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                    <CheckDatesBox $insidebox>
                        <h5>Check Out</h5>
                        <p>{new Date(Number(bookingData!.check_out)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                </CheckDatesBox>
                <hr />
                <RoomBox>
                    <RoomBox $insidebox>
                        <h5>Room Info</h5>
                        <p>{bookingData!.room_type} - {bookingData!.room_number}</p>
                    </RoomBox>
                    <RoomBox $insidebox>
                        <h5>Price</h5>
                        <p>${room!.price}<span>/Night</span></p>
                    </RoomBox>
                </RoomBox>
                <p>{room!.cancelation}</p>
                <p>Facilities</p>
                <FacilitiesContainer>
                    {room!.amenities.slice(0, 5).map(amenity => {
                        if (amenity === 'AC') return <FacilitiesCard><TbAirConditioning size={26} />&nbsp;{amenity}</FacilitiesCard>
                        if (amenity === 'Shower') return <FacilitiesCard><FaShower size={26} />&nbsp;{amenity}</FacilitiesCard>
                        if (amenity === 'Comfort Bed') return <FacilitiesCard><LiaBedSolid size={30} />&nbsp;{amenity}</FacilitiesCard>
                        return <FacilitiesCard>{amenity}</FacilitiesCard>
                    })}
                </FacilitiesContainer>
            </LeftSide>

            <RightSide $backColor={room.status}>
                <h3>{room.status}</h3>
                <Swiper
                    className="mySwiper"
                    navigation={true}
                    modules={[Navigation]}
                    spaceBetween={1}
                    slidesPerView='auto'
                >
                    <SwiperSlide><img src="../../public/room1.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="../../public/room2.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="../../public/room3.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="../../public/room4.jpg" alt="" /></SwiperSlide>
                </Swiper>
                <section>
                    <h2>{room.room_type}</h2>
                    <p>{room.description}</p>
                </section>
            </RightSide>
        </DashBoard>
    )
}