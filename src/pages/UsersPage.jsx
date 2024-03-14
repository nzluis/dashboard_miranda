import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonActive, ButtonSecondary } from '../style/ButtonStyled';
import { Tab, TabsContainer } from '../style/TopMenuStyled';
import { SelectOrder } from '../style/TopMenuStyled';
import { TopMenu } from '../style/TopMenuStyled';
import { ButtonsContainer } from '../style/TopMenuStyled';
import usePaginate from '../../hooks/usePaginate';
import { Pages, PaginationContainer, Page, PageSelected } from '../style/PaginatorStyled';
import { usersData } from '../features/users/usersSlice';
import { LinearProgress } from '@mui/material';
import { fetchUsers } from '../features/users/usersThunk';

function Users() {
    const columns = [
        {
            label: "Name",
            display: row =>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <img src={row.photo} />
                    <div>
                        <p className='highlight'>{row.full_name}</p>
                        <p className='panelColor'>#{row.id.slice(0, 8)}</p>
                        <p className='lighter'>joined on {new Date(Number(row.start_date)).toDateString().slice(4)}</p>
                        <p className='lighter'>{row.email}</p>
                    </div>
                </div>
        },
        {
            label: 'Description',
            display: row =>
                <div className='moreLines'>
                    <h5>{row.position}</h5>
                    <p>{row.description.slice(0, 100)}</p>
                </div >
        },
        {
            label: 'Contact',
            property: 'phone'
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Active' ? "bookingStatus green" :
                                row.status === 'Inactive' ? "bookingStatus red" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        },
    ]

    const deleteUser = (e, user) => {
        e.stopPropagation()
        dispatch(deleteUserById(user.id))
    }

    const editUser = (e, user) => {
        e.stopPropagation()
        navigate(`/users/edit/${user.id}`)
    }

    const actions = [
        { name: 'Delete', handler: deleteUser },
        { name: 'Edit', handler: editUser },
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tabs = ['All Users', 'Active', 'Inactive']
    const orderTags = ['start_date', 'full_name']
    const [selectedTab, setSelectedTab] = useState('All Users')
    const [orderBy, setOrderBy] = useState('start_date')
    const [fetched, setFetched] = useState(false)
    const allUsers = useSelector(usersData)
    const users = useMemo(() => {
        const users = selectedTab === 'All Users' ?
            allUsers :
            allUsers.filter(user => user.status === selectedTab)
        return [...users].sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return 1
            } else if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            return 0
        })
    }, [allUsers, selectedTab, orderBy])

    const { pageData, currentPage, setPage } = usePaginate(users)
    const totalPages = Math.ceil(users.length / 10)

    const initialFetch = async () => {
        await dispatch(fetchUsers()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])

    function handleTab(tab) {
        setPage(1)
        setSelectedTab(tab)
    }

    return (
        <DashBoard>
            <TopMenu>
                <TabsContainer>
                    {tabs.map((tab, index) => {
                        return <Tab key={index} onClick={() => handleTab(tab)}>{tab}</Tab>
                    })}
                </TabsContainer>
                <ButtonsContainer>
                    <ButtonActive onClick={() => navigate('/users/new-user')}>+ New User</ButtonActive>
                    <SelectOrder onChange={(e) => setOrderBy(e.target.value)}>
                        {orderTags.map((tag, index) => {
                            return <option
                                key={index}
                                value={tag}>
                                {tag === 'start_date' ? 'Date' : 'Name'}
                            </option>
                        })}
                    </SelectOrder>
                </ButtonsContainer>
            </TopMenu>
            {fetched ? <DataTable data={pageData} columns={columns} actions={actions} /> : <LinearProgress />}
            <PaginationContainer>
                {currentPage > 1 && <button onClick={() => setPage(currentPage - 1)}>Prev</button>}
                <Pages>
                    {[...Array(totalPages).keys()].map((page, index) => {
                        if (currentPage === page + 1) {
                            return <PageSelected key={index} onClick={() => setPage(page + 1)}>{page + 1}</PageSelected>
                        }
                        return <Page key={index} onClick={() => setPage(page + 1)}>{page + 1}</Page>
                    })}
                </Pages>
                {currentPage < totalPages && <ButtonSecondary onClick={() => setPage(currentPage + 1)}>Next</ButtonSecondary>}
            </PaginationContainer>
        </DashBoard>
    )
}

export default Users