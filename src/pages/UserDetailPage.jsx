import { useParams } from "react-router-dom"

export default function UserDetail() {
    const { id } = useParams()

    return (
        <DashBoard>
            <h1>User number {id}</h1>
        </DashBoard>
    )
}