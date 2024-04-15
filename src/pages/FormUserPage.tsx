import { Form, FormRow, UserFileStyled } from "../style/FormStyled";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { createUser, fetchUserById, updateUser } from "../features/users/usersThunk";
import { useNavigate, useParams } from "react-router-dom";
import { userByIdData } from "../features/users/usersSlice";
import { LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserData } from "../interfaces/Users";

export default function FormUserPage() {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [fetched, setFetched] = useState(false)
    const user = useAppSelector(userByIdData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<UserData>({
        id: '',
        start_date: '',
        photo: '',
        full_name: '',
        email: '',
        description: '',
        position: 'Room Service',
        phone: '',
        password: '',
        status: 'Active'
    })

    const initialFetch = async () => {
        await dispatch(fetchUserById(id))
        setFetched(true)
    }

    useEffect(() => {
        if (id) initialFetch()
    }, [])

    useEffect(() => {
        if (id && user) setFormData({ ...user })
    }, [user])

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        !id ?
            await dispatch(
                createUser({
                    ...formData,
                    id: Math.round(Math.random() * 100000000000).toString(),
                    start_date: new Date(Date.now()).getTime().toString()
                })
            ).unwrap().then(navigate('/users'))
            :
            await dispatch(
                updateUser({
                    ...formData,
                    start_date: new Date(formData.start_date).getTime().toString(),
                })
            ).unwrap().then(() => navigate('/users'))
    }

    if (!fetched && id) return <LinearProgress />

    return (
        <DashBoard>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="full_name">Full Name:
                    <input
                        value={formData.full_name}
                        onChange={handleChange}
                        name="full_name"
                        id="full_name"
                    />
                </label>
                <label htmlFor="email">Email:
                    <input
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        id="email"
                    />
                </label>
                <FormRow>
                    <label htmlFor="password">Password:
                        <input
                            // value={FormData.password}
                            // onChange={handleChange}
                            name="password"
                            id="password"
                            type='password'
                        />
                    </label>
                    <label htmlFor="repeat_password">Repeat Password:
                        <input
                            name="repeat_password"
                            id="repeat_password"
                            type="password"
                        />
                    </label>
                </FormRow>
                <label htmlFor="description">Description:
                    <textarea
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                        id="description"
                        style={{ height: '125px' }}
                    />
                </label>
                <FormRow>
                    <label htmlFor="phone">Phone:
                        <input
                            value={formData.phone}
                            onChange={handleChange}
                            name="phone"
                            id="phone"
                        />
                    </label>
                    <label htmlFor="status">Status:
                        <select
                            value={formData.status}
                            onChange={handleChange}
                            name="status"
                            id="status"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </label>
                </FormRow>
                <FormRow>
                    <UserFileStyled htmlFor="photo">Upload Photo
                        <input
                            // value={formData.photo}
                            onChange={handleChange}
                            name="photo"
                            type="file"
                            id="photo"
                        />
                    </UserFileStyled>
                    <label htmlFor="position">Position:
                        <select
                            value={formData.position}
                            onChange={handleChange}
                            name="position"
                            id="position"
                        >
                            <option value="Manager">Manager</option>
                            <option value="Room Service">Room Service</option>
                            <option value="Recepcionist">Recepcionist</option>
                        </select>
                    </label>
                </FormRow>
                <ButtonActive type="submit">{id ? 'Edit User' : 'Create User'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}