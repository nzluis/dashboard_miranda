import { useParams } from "react-router-dom"

export default function BookingDetail() {
    const { id } = useParams()
    return (
        <div>Booking number {id}</div>
    )
}