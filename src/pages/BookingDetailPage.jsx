import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"
import { CheckDatesBox, LeftSide, RightSide } from "../style/BookingDetailStyled"
import data from '../assets/data/bookings.json'

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default function BookingDetail() {
    const { id } = useParams()
    const userData = data[id - 1]
    return (
        <DashBoard flex>
            <LeftSide>
                <h1>{userData.first_name} {userData.last_name}</h1>
                <p>{userData.id}</p>
                <CheckDatesBox>
                    <CheckDatesBox insidebox>
                        <h5>Check In</h5>
                        <p>{new Date(Number(userData.check_in)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                    <CheckDatesBox insidebox>
                        <h5>Check Out</h5>
                        <p>{new Date(Number(userData.check_out)).toLocaleDateString('en-EN', options)}</p>
                    </CheckDatesBox>
                </CheckDatesBox>
                <p>{userData.room_type}</p>
                <p>{userData.price}</p>
                <p>descripcion</p>
                <p>325$</p>
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