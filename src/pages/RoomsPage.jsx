import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { useNavigate } from 'react-router-dom'
import { ButtonActive, ButtonSecondary } from '../style/ButtonStyled'
import { useEffect, useMemo, useState } from 'react'
import { roomsData } from '../features/rooms/roomsSlice'
import usePaginate from '../../hooks/usePaginate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRoomById, fetchRooms } from '../features/rooms/roomsThunk'
import { ButtonsContainer, SelectOrder, Tab, TabsContainer, TopMenu } from '../style/TopMenuStyled'
import { LinearProgress } from '@mui/material'
import { Page, PageSelected, Pages, PaginationContainer } from '../style/PaginatorStyled'

export default function Rooms() {
    const navigate = useNavigate()

    const columns = [
        {
            label: "Room Name",
            display: row =>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <img src={row.photo} />
                    <div>
                        <p className='panelColor'># {row.id.slice(0, 8)}</p>
                        {row.room_number}
                    </div>
                </div>
        },
        {
            label: 'Room Type',
            property: 'room_type'
        },
        {
            label: 'Amenities',
            display: row =>
                <div className='twoLines'>
                    <p>{row.amenities.toString().slice(0, 21) + '...'}</p>
                </div>
        },
        {
            label: 'Price',
            display: row =>
                <div>
                    <span className='highlight'>{Number(row.price)}€</span><span className='panelColor'>/Night</span>
                </div>
        },
        {
            label: 'Offer',
            display: row =>
                <div>
                    {row.offer ?
                        <><span className='highlight'>{Math.round(Number(row.price) * (1 - Number(row.discount) / 100))}€</span><span className='panelColor'>/Night</span></>
                        :
                        <span className='highlight'>Not now</span>
                    }
                </div>
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Available' ? "bookingStatus green" :
                                row.status === 'Booked' ? "bookingStatus red" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        },
    ]

    const deleteRoom = (e, room) => {
        e.stopPropagation()
        dispatch(deleteRoomById(room.id))
    }

    const editRoom = (e, room) => {
        e.stopPropagation()
        navigate(`/rooms/edit/${room.id}`)
    }

    const actions = [
        { name: 'Delete', handler: deleteRoom },
        { name: 'Edit', handler: editRoom },
    ]


    const tabs = ['All Rooms', 'Available', 'Booked']
    const orderTags = ['low_to_high', 'high_to_low']
    const [selectedTab, setSelectedTab] = useState('All Rooms')
    const [orderBy, setOrderBy] = useState('low_to_high')
    const [fetched, setFetched] = useState(false)
    const dispatch = useDispatch()
    const allRooms = useSelector(roomsData)
    const rooms = useMemo(() => {
        const rooms = selectedTab === 'All Rooms' ?
            allRooms :
            allRooms.filter(booking => booking.status === selectedTab)
        return [...rooms].sort((a, b) => {
            if (orderBy === 'high_to_low') {
                if (a["price"] < b["price"]) {
                    return 1
                } else if (a["price"] > b["price"]) {
                    return -1;
                }
                return 0
            }
            if (a["price"] > b["price"]) {
                return 1
            } else if (a["price"] < b["price"]) {
                return -1;
            }
            return 0
        })
    }, [allRooms, selectedTab, orderBy])

    const { pageData, currentPage, setPage } = usePaginate(rooms)
    const totalPages = Math.ceil(rooms.length / 10)

    const initialFetch = async () => {
        await dispatch(fetchRooms()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])

    const [stateIndex, setStateIndex] = useState(0)
    function handleTab(tab, index) {
        setPage(1)
        tab === selectedTab ? setSelectedTab('All Rooms') : setSelectedTab(tab)
        stateIndex === index ? setStateIndex(0) : setStateIndex(index)
    }

    return (
        <DashBoard>
            <TopMenu>
                <TabsContainer>
                    {tabs.map((tab, index) => {
                        return tab !== 'All Rooms' && <Tab $active={index === stateIndex && true} key={index} onClick={() => handleTab(tab, index)}>{tab}</Tab>
                    })}
                </TabsContainer>
                <ButtonsContainer>
                    <ButtonActive onClick={() => navigate('/rooms/new-room')}>+ New Room</ButtonActive>
                    <SelectOrder onChange={(e) => setOrderBy(e.target.value)}>
                        {orderTags.map((tag, index) => {
                            return <option
                                key={index + 1}
                                value={tag}>
                                Price: {tag.split('_').map(element => element[0].toUpperCase() + element.slice(1)).join(' ')}
                            </option>
                        })}
                    </SelectOrder>
                </ButtonsContainer>
            </TopMenu>
            {fetched ?
                <>
                    <DataTable data={pageData} columns={columns} actions={actions} position={'bottom'} noPointer />
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