import { DashBoard } from '../style/DashBoardStyled'
import DataTable from '../components/DataTable'
import { useEffect, useMemo, useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { allBookingsSelector } from '../features/bookings/bookingsSlice';
import { fetchBookings } from '../features/bookings/bookingsThunk';
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
                    <p className='panelColor'># {row.id}</p>
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
            display: row => new Date(Number(row.check_in)).toDateString()
        },
        {
            label: 'Check Out',
            display: row => new Date(Number(row.check_out)).toDateString()
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
            property: 'room_type'
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
    const orderTags = ['order_date', 'last_name', 'check_in', 'check_out']
    const [selectedTab, setSelectedTab] = useState('All Bookings')
    const [orderBy, setOrderBy] = useState('order_date')
    const [fetched, setFetched] = useState(false)
    const allBookings = useSelector(allBookingsSelector)
    const bookings = useMemo(() => {
        let bookings = selectedTab === 'All Bookings' ?
            allBookings :
            allBookings.filter(booking => booking.status === selectedTab)
        bookings = [...bookings].sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return 1
            } else if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            return 0
        })
        return bookings
    }, [allBookings, selectedTab, orderBy])

    const { pageData, currentPage, setPage } = usePaginate(bookings)
    const totalPages = Math.ceil(bookings.length / 10)

    const initialFetch = async () => {
        await dispatch(fetchBookings())
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
                    <ButtonActive onClick={() => navigate('/bookings/new-booking')}>+ New Booking</ButtonActive>
                    <SelectOrder onChange={(e) => setOrderBy(e.target.value)}>
                        {orderTags.map((tag, index) => {
                            return <option
                                key={index}
                                value={tag}>
                                {tag.split('_').map(element => element[0].toUpperCase() + element.slice(1)).join(' ')}
                            </option>
                        })}
                    </SelectOrder>
                </ButtonsContainer>
            </TopMenu>
            {fetched ? <DataTable data={pageData} columns={columns} /> : <LinearProgress />}
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
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>

    )
}