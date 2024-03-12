import { Form, FormRow, UserFileStyled } from "../style/FormStyled";
import { useState } from "react";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";

export default function FormUserPage() {
    const [photo, setPhoto] = useState()
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [contact, setContact] = useState()
    const [status, setStatus] = useState('active')

    const newUser = {
        id: Math.random() * 1000,
        photo,
        full_name: fullName,
        email: email,
        start_date: Date.now(),
        description,
        contact,
        status,
    }

    function handleSubmit(e) {
        e.preventDefault()
        alert(`
            Booking registered successfuly:
                ${newUser.full_name}
                Status : ${newUser.status}
        `)
    }

    return (
        <DashBoard>
            <Form>
                <label htmlFor="full_name">Full Name:
                    <input

                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        name="full_name"
                    />
                </label>
                <label htmlFor="email">Email:
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                    />
                </label>
                <label htmlFor="description">Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        style={{ height: '125px' }}
                    />
                </label>
                <FormRow>
                    <label htmlFor="contact">Contact:
                        <input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            name="contact"
                            type="number"
                        />
                    </label>
                    <label htmlFor="status">Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </label>
                </FormRow>
                <UserFileStyled htmlFor="photo">Upload Photo
                    <input
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        name="photo"
                        type="file"
                        id="photo"
                    />
                </UserFileStyled>
                <ButtonActive onClick={(e) => handleSubmit(e)}>Create User</ButtonActive>
            </Form>
        </DashBoard>
    )
}