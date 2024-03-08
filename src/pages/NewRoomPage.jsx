import { Form } from "../style/FormStyled";
import { useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";

export default function NewRoomPage() {
    const [photo, setPhoto] = useState()
    const [roomNumber, setRoomNumber] = useState()
    const [roomType, setRoomType] = useState()
    const [amenities, setAmenities] = useState()
    const [price, setPrice] = useState()
    const [offerPrice, setOfferPrice] = useState()
    const [status, setStatus] = useState()

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
                ${newRoom.price} now ${newRoom.offerPrice}
        `)
    }

    return (
        <DashBoard>
            <Form>
                <label htmlFor="photo">Photo:
                    <input

                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        name="photo"
                        type="file"
                    />
                </label>
                <label htmlFor="room_number">Room Number:
                    <input
                        value={roomNumber}
                        onChange={(e) => setroomNumber(e.target.value)}
                        name="room_number"
                    />
                </label>
                <label htmlFor="amenities">Amenities:
                    <input
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        name="amenities"
                        type="checkbox"
                    />A/C
                    <input
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        name="amenities"
                        type="checkbox"
                    />Shower
                    <input
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        name="amenities"
                        type="checkbox"
                    />Coffee Set
                </label>
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
                        onChange={(e) => setOffer_price(e.target.value)}
                        name="offer_price"
                        type="number"
                    />
                </label>
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
                <ButtonActive onClick={(e) => handleSubmit(e)}>Send</ButtonActive>
            </Form>
        </DashBoard>
    )
}