import { Form, FormRow, UserFileStyled } from "../style/FormStyled";
import { DashBoard } from "../style/DashBoardStyled";
import { ButtonActive } from "../style/ButtonStyled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUserById, updateUser } from "../features/users/usersThunk";
import { useNavigate, useParams } from "react-router-dom";
import { userByIdData } from "../features/users/usersSlice";
import { LinearProgress } from "@mui/material";

export default function FormUserPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [fetched, setFetched] = useState(false)
    const user = useSelector(userByIdData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        photo: null,
        full_name: '',
        email: '',
        description: '',
        position: 'Room Service',
        phone: '',
        password: '',
        status: 'Active'
    })

    const initialFetch = async () => {
        await dispatch(fetchUserById(id)).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        if (id) initialFetch()
    }, [])

    useEffect(() => {
        if (id && user) setFormData({
            ...user,
            start_date: new Date(Number(user.start_date)).toISOString().slice(0, 10),
        })
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        !id ?
            await dispatch(
                createUser({
                    id: Math.round(Math.random() * 100000000000).toString(),
                    start_date: new Date(Date.now()).getTime(),
                    ...formData
                })
            ).unwrap().then(navigate('/users'))
            :
            await dispatch(
                updateUser({
                    ...formData,
                    start_date: new Date(formData.start_date).getTime(),
                })
            ).unwrap().then(navigate('/users'))
    }

    if (!fetched && id) return <LinearProgress />

    return (
        <DashBoard>
            <Form>
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
                <ButtonActive onClick={handleSubmit}>{id ? 'Edit User' : 'Create User'}</ButtonActive>
            </Form>
        </DashBoard>
    )
}