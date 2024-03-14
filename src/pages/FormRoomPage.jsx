import { FileStyled, Form, FormRow } from "../style/FormStyled";
import { useEffect, useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createRoom, fetchRoomById, updateRoom } from "../features/rooms/roomsThunk";
import { roomByIdData } from "../features/rooms/roomsSlice";
import { LinearProgress } from "@mui/material";
import Select from 'react-select'

export default function FormRoomPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [fetched, setFetched] = useState(false)
    const room = useSelector(roomByIdData)
    const amenities = [
        { value: 'AC', label: 'AC' },
        { value: 'Shower', label: 'Shower' },
        { value: 'Towel', label: 'Towel' },
        { value: 'Comfort Bed', label: 'Comfort Bed' },
        { value: 'Bathup', label: 'Bathup' },
        { value: 'Coffee Set', label: 'Coffee Set' },
        { value: 'LED TV', label: 'LED TV' },
        { value: 'Wifi', label: 'Wifi' },
    ]
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        photo: null,
        room_number: '',
        room_type: 'Single Bed',
        amenities: [
            "AC",
            "Shower",
            "Comfort Bed",
            "Towel",
            "Bathup",
            "Coffee Set",
            "LEDTV",
            "Wifi"
        ],
        price: '',
        offer: false,
        discount: '',
        description: '',
        cancelation: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        status: 'Available',
    })

    const initialFetch = async () => {
        await dispatch(fetchRoomById(id)).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        if (id) initialFetch()
    }, [])

    useEffect(() => {
        if (id && room) setFormData({ ...room })
    }, [room])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        !id ?
            await dispatch(
                createRoom({
                    id: Math.round(Math.random() * 10000000000).toString(),
                    ...formData,
                    offer: formData.discount ? true : false
                })
            ).unwrap().then(navigate('/rooms'))
            :
            await dispatch(
                updateRoom({
                    ...formData,
                    offer: formData.discount ? true : false,
                })
            ).unwrap().then(navigate('/rooms'))
    }

    if (!fetched && id) return <LinearProgress />
    return (
        <DashBoard>
            <Form>
                <FormRow label="file">
                    <label htmlFor="room_number">Room Number:
                        <input
                            value={formData.room_number}
                            onChange={handleChange}
                            name="room_number"
                            id="room_number"
                        />
                    </label>
                    <FileStyled htmlFor="photo">Upload Photo
                        <input
                            onChange={handleChange}
                            name="photo"
                            type="file"
                            id="photo"
                        />
                    </FileStyled>
                </FormRow>
                <label htmlFor="amenities">Amenities:
                    <Select
                        defaultValue={[amenities[7], amenities[0], amenities[1]]}
                        isMulti
                        options={amenities}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleChange}
                        name="amenities"
                        id="amenities"
                    />
                </label>
                <FormRow>
                    <label htmlFor="price">Price:
                        <input
                            value={formData.price}
                            onChange={handleChange}
                            name="price"
                            id="price"
                        />
                    </label>
                    <label htmlFor="discount">Discount (%):
                        <input
                            value={formData.discount}
                            onChange={handleChange}
                            name="discount"
                            id="discount"
                        />
                    </label>
                </FormRow>
                <FormRow>
                    <label htmlFor="room_type">Room Type:
                        <select
                            value={formData.room_type}
                            onChange={handleChange}
                            name="room_type"
                            id="room_type"
                        >
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </label>
                    <label htmlFor="status">Status:
                        <select
                            value={formData.status}
                            onChange={handleChange}
                            name="status"
                            id="status"
                        >
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                        </select>
                    </label>
                </FormRow>
                <ButtonActive onClick={(e) => handleSubmit(e)}>{id ? 'Edit Room' : 'Create Room'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}