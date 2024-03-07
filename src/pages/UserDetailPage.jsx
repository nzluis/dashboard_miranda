import { useParams } from "react-router-dom"
import { DashBoard } from "../style/DashBoardStyled"

export default function UserDetail() {
    const { id } = useParams()

    return (
        <DashBoard>
            <h1>User {id}</h1>
        </DashBoard>
    )
}