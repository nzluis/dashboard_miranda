import { useParams } from "react-router-dom"

export default function RoomDetail() {
    const { id } = useParams()
    return (
        <div>Room number {id}</div>
    )
}