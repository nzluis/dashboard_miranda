import { DashBoard } from '../style/DashBoardStyled'
import DataTable from '../components/DataTable'
import { useEffect, useMemo, useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { bookingsData } from '../features/bookings/bookingsSlice';
import { deleteBookingById, fetchBookings } from '../features/bookings/bookingsThunk';
import { LinearProgress } from '@mui/material';
import { ButtonActive, ButtonSecondary } from '../style/ButtonStyled';
import { useNavigate } from 'react-router-dom';
import { Tab, TabsContainer } from '../style/TopMenuStyled';
import { SelectOrder } from '../style/TopMenuStyled';
import { TopMenu } from '../style/TopMenuStyled';
import { ButtonsContainer } from '../style/TopMenuStyled';
import usePaginate from '../../hooks/usePaginate';
import { Pages, PaginationContainer, Page, PageSelected } from '../style/PaginatorStyled';

export default function Bookings() {
    const columns = [
        {
            label: "Guest",
            display: row =>
                <div>
                    <p>{row.first_name}{' '}{row.last_name}</p>
                    <p className='panelColor'># {row.id.slice(0, 8)}</p>
                </div>
        },
        {
            label: 'Order Date',
            display: row =>
                <div className='lighter'>
                    {new Date(Number(row.order_date)).toString().slice(0, 21)}
                </div>
        },
        {
            label: 'Check In',
            display: row => row.check_in.length === 10 ? new Date(new Date(row.check_in).getTime()).toDateString() : new Date(Number(row.check_in)).toDateString()
        },
        {
            label: 'Check Out',
            display: row => row.check_in.length === 10 ? new Date(new Date(row.check_out).getTime()).toDateString() : new Date(Number(row.check_out)).toDateString()
        },
        {
            label: 'Special Request',
            display: row =>
                <>
                    <div
                        className="request"
                        onClick={(e) => handleOpen(e, row.request)}
                    >
                        View Notes
                    </div>
                </>
        },
        {
            label: 'Room Type',
            display: row =>
                <>
                    <p>{row.room_type}</p>
                    <p>{row.room_number}</p>
                </>
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Check In' ? "bookingStatus green" :
                                row.status === 'Check Out' ? "bookingStatus red" :
                                    row.status === 'In Progress' ? "bookingStatus yellow" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        }
    ]

    const deleteBooking = (e, booking) => {
        e.stopPropagation()
        dispatch(deleteBookingById(booking.id))
    }

    const editBooking = (e, booking) => {
        e.stopPropagation()
        navigate(`/bookings/edit/${booking.id}`)
    }

    const actions = [
        { name: 'Delete', handler: deleteBooking },
        { name: 'Edit', handler: editBooking },
    ]
    const [open, setOpen] = useState(false);
    const handleOpen = (e, message) => {
        e.stopPropagation()
        setSelectedNote(message)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const [selectedNote, setSelectedNote] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tabs = ['All Bookings', 'Check In', 'Check Out', 'In Progress']
    const orderTags = ['order_date', 'order_date_DESC', 'last_name', 'last_name_DESC', 'check_in', 'check_in_DESC', 'check_out', 'check_out_DESC']
    const [selectedTab, setSelectedTab] = useState('All Bookings')
    const [orderBy, setOrderBy] = useState('order_date')
    const [fetched, setFetched] = useState(false)
    const allBookings = useSelector(bookingsData)
    const bookings = useMemo(() => {
        const bookings = allBookings.filter(booking => selectedTab === 'All Bookings' ? true : booking.status === selectedTab)
        return bookings.sort((a, b) => {
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
    }, [allBookings, selectedTab, orderBy])

    const { pageData, currentPage, setPage } = usePaginate(bookings)
    const totalPages = Math.ceil(bookings.length / 10)

    const initialFetch = async () => {
        await dispatch(fetchBookings()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        initialFetch()
    }, [])

    const [stateIndex, setStateIndex] = useState(0)
    function handleTab(tab, index) {
        setPage(1)
        tab === selectedTab ? setSelectedTab('All Bookings') : setSelectedTab(tab)
        stateIndex === index ? setStateIndex(0) : setStateIndex(index)
    }

    return (
        <DashBoard>
            <TopMenu>
                <TabsContainer>
                    {tabs.map((tab, index) => {
                        return tab !== 'All Bookings' && <Tab $active={index === stateIndex && true} key={index} onClick={() => handleTab(tab, index)}>{tab}</Tab>
                    })}
                </TabsContainer>
                <ButtonsContainer>
                    <ButtonActive onClick={() => navigate('/bookings/new-booking')}>+ New Booking</ButtonActive>
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
                    <DataTable data={pageData} columns={columns} actions={actions} />
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
                </>
                : <LinearProgress />
            }
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>

    )
}