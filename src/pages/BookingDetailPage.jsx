import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"

export default function BookingDetail() {
    const { id } = useParams()
    return (
        <DashBoard>
            <h1>Booking number {id}</h1>
        </DashBoard>
    )
}