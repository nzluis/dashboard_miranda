import { useParams } from "react-router-dom"

export default function ContactDetail() {
    const { id } = useParams()
    return (
        <div>Contact number {id}</div>
    )
}