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
import { deleteUserById, fetchUsers } from '../features/users/usersThunk';

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
            display: row =>
                <div>
                    {row.phone}
                </div>
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
    const orderTags = ['start_date', 'start_date_DESC', 'full_name', 'full_name_DESC']
    const [selectedTab, setSelectedTab] = useState('All Users')
    const [orderBy, setOrderBy] = useState('start_date')
    const [fetched, setFetched] = useState(false)
    const allUsers = useSelector(usersData)
    const users = useMemo(() => {
        const users = allUsers.filter(user => selectedTab === 'All Users' ? true : user.status === selectedTab)
        return users.sort((a, b) => {
            let firstItem, secondItem, orderingProperty;
            if (orderBy.includes('_DESC')) {
                firstItem = b;
                secondItem = a;
                orderingProperty = orderBy.split('_DESC')[0]
            } else {
                firstItem = a;
                secondItem = b;
                orderingProperty = orderBy.split('_DESC')[0]
            }
            if (firstItem[orderingProperty] > secondItem[orderingProperty]) {
                return 1
            } else if (firstItem[orderingProperty] < secondItem[orderingProperty]) {
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

    const [stateIndex, setStateIndex] = useState(0)
    function handleTab(tab, index) {
        setPage(1)
        tab === selectedTab ? setSelectedTab('All Users') : setSelectedTab(tab)
        stateIndex === index ? setStateIndex(0) : setStateIndex(index)
    }

    return (
        <DashBoard>
            <TopMenu>
                <TabsContainer>
                    {tabs.map((tab, index) => {
                        return tab !== 'All Users' && <Tab $active={index === stateIndex && true} key={index} onClick={() => handleTab(tab, index)}>{tab}</Tab>
                    })}
                </TabsContainer>
                <ButtonsContainer>
                    <ButtonActive onClick={() => navigate('/users/new-user')}>+ New User</ButtonActive>
                    <SelectOrder onChange={(e) => setOrderBy(e.target.value)}>
                        {orderTags.map((tag, index) => {
                            return <option
                                key={index}
                                value={tag}>
                                {tag.split('_').map(element => element !== 'DESC' ? element[0].toUpperCase() + element.slice(1) : '').join(' ')}
                                {tag.split('_')[2] ? ' ↑' : ' ↓'}
                            </option>
                        })}
                    </SelectOrder>
                </ButtonsContainer>
            </TopMenu>
            {fetched ?
                <>
                    <DataTable data={pageData} columns={columns} actions={actions} noPointer />
                    <PaginationContainer>
                        {currentPage > 1 ? <ButtonSecondary onClick={() => setPage(currentPage - 1)}>Prev</ButtonSecondary> : <ButtonSecondary $notAllow disabled>Prev</ButtonSecondary>}
                        <Pages>
                            {[...Array(totalPages).keys()].map((page, index) => {
                                if (currentPage === page + 1) {
                                    return <PageSelected key={index} onClick={() => setPage(page + 1)}>{page + 1}</PageSelected>
                                }
                                return <Page key={index} onClick={() => setPage(page + 1)}>{page + 1}</Page>
                            })}
                        </Pages>
                        {currentPage < totalPages ? <ButtonSecondary onClick={() => setPage(currentPage + 1)}>Next</ButtonSecondary> : <ButtonSecondary $notAllow disabled>Next</ButtonSecondary>}
                    </PaginationContainer>
                </>
                : <LinearProgress />}
        </DashBoard>
    )
}

export default Users