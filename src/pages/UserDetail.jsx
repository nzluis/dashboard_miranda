import { useParams } from "react-router-dom"

export default function UserDetail() {
    const { id } = useParams()

    return (
        <div>User number {id}</div>
    )
}