import { useParams } from "react-router-dom"

export default function RoomDetail() {
    const { id } = useParams()
    return (
        <DashBoard>
            <h1>Room number {id}</h1>
        </DashBoard>
    )
}