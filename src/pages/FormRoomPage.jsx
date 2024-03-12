import { FileStyled, Form, FormRow } from "../style/FormStyled";
import { useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";

export default function FormRoomPage() {
    const [photo, setPhoto] = useState()
    const [roomNumber, setRoomNumber] = useState()
    const [roomType, setRoomType] = useState('single_bed')
    const [amenities, setAmenities] = useState('AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi')
    const [price, setPrice] = useState()
    const [offerPrice, setOfferPrice] = useState()
    const [status, setStatus] = useState(('available'))

    const newRoom = {
        id: Math.random() * 1000,
        photo: photo,
        room_number: roomNumber,
        room_type: roomType,
        amenities: amenities,
        price,
        offer_price: offerPrice,
        status,
    }

    function handleSubmit(e) {
        e.preventDefault()
        alert(`
            Booking registered successfuly:
                ${newRoom.room_type} ${newRoom.room_number}
                ${newRoom.price} now ${newRoom.offer_price}
        `)
    }

    return (
        <DashBoard>
            <Form>
                <FormRow label="file">
                    <label htmlFor="room_number">Room Number:
                        <input
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            name="room_number"
                        />
                    </label>
                    <FileStyled htmlFor="photo">Upload Photo
                        <input
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            name="photo"
                            type="file"
                            id="photo"
                        />
                    </FileStyled>
                </FormRow>
                <label htmlFor="amenities">Amenities:
                    <input
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        name="amenities"
                    />
                </label>
                <FormRow>
                    <label htmlFor="price">Price:
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            type="number"
                        />
                    </label>
                    <label htmlFor="offer_price">Offer Price:
                        <input
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            name="offer_price"
                            type="number"
                        />
                    </label>
                </FormRow>
                <FormRow>
                    <label htmlFor="room_type">Room Type:
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            name="room_type"
                        >
                            <option value="single_bed">Single Bed</option>
                            <option value="double_bed">Double Bed</option>
                            <option value="double_superior">Double Superior</option>
                            <option value="suite">Suite</option>
                        </select>
                    </label>
                    <label htmlFor="status">Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                        >
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                        </select>
                    </label>
                </FormRow>
                <ButtonActive onClick={(e) => handleSubmit(e)}>Create Room</ButtonActive>
            </Form>
        </DashBoard>
    )
}