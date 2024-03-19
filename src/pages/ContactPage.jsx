import contacts from '../assets/data/contacts.json'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { useEffect, useMemo, useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { contactsData } from '../features/contacts/contactsSlice';
import usePaginate from '../../hooks/usePaginate';
import { deleteContactById, fetchContacts, updateContact } from '../features/contacts/contactsThunk';
import { Tab, TabsContainer, TopMenu } from '../style/TopMenuStyled';
import { Page, PageSelected, Pages, PaginationContainer } from '../style/PaginatorStyled';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { ButtonSecondary } from '../style/ButtonStyled';

function Contact() {
    const [open, setOpen] = useState(false);
    const handleOpen = (e, message) => {
        e.stopPropagation()
        setSelectedNote(message)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const [selectedNote, setSelectedNote] = useState('')
    const tabs = ['All Messages', 'Read', 'Unread']
    const [selectedTab, setSelectedTab] = useState('All Messages')
    const [fetched, setFetched] = useState(false)
    const [editing, setEditing] = useState(false)
    const dispatch = useDispatch()
    const columns = [
        {
            label: 'ID',
            property: 'id'
        },
        {
            label: 'Date',
            display: row =>
                <div>
                    <p>{new Date(Number(row.date)).toString().slice(0, 15)}</p>
                    <p>{new Date(Number(row.date)).toString().slice(0, 21).split(' ')[4]}</p>
                </div>
        },
        {
            label: 'Customer',
            display: row =>
                <div className='twoLines'>
                    <p className='highlight'>{row.full_name}</p>
                    <p className='panelColor'>{row.phone}</p>
                    <p className='panelColor'>{row.email}</p>
                </div>
        },
        {
            label: 'Comment',
            display: row =>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleOpen(e, row.message)}
                    className='twoLines'
                >
                    <h5>{row.subject}</h5>
                    <p>{row.message.slice(0, 50)}
                        <span
                            style={{ color: "var(--hg-yellow)" }}
                            className='highlight'
                        >{'  '}... more</span></p>
                </div>
        },
        {
            label: 'Status',
            display: row =>
                <>
                    <div
                        className={
                            row.status === 'Read' ? "bookingStatus green" :
                                row.status === 'Unread' ? "bookingStatus red" : ''
                        }
                    >
                        <p>{row.status}</p>
                    </div>
                </>
        }
    ]

    const deleteContact = (e, contact) => {
        e.stopPropagation()
        dispatch(deleteContactById(contact.id))
    }

    const editContact = async (e, contact) => {
        e.stopPropagation()
        setEditing(true)
        await dispatch(updateContact({
            ...contact,
            status: contact.status === 'Read' ? 'Unread' : 'Read'
        })).unwrap()

    }

    const actions = [
        { name: 'Delete', handler: deleteContact },
        { name: 'Edit', handler: editContact },
    ]

    const allContacts = useSelector(contactsData)
    const contacts = useMemo(() => {
        const contacts = selectedTab === 'All Messages' ?
            allContacts :
            allContacts.filter(contact => contact.status === selectedTab)
        return [...contacts].sort((a, b) => {
            if (a["date"] < b["date"]) {
                return 1
            } else if (a["date"] > b["date"]) {
                return -1;
            }
            return 0
        })
    }, [allContacts, selectedTab])


    const { pageData, currentPage, setPage } = usePaginate(contacts)
    const totalPages = Math.ceil(contacts.length / 10)

    const initialFetch = async () => {
        await dispatch(fetchContacts()).unwrap()
        setFetched(true)
    }

    useEffect(() => {
        if (editing) setEditing(false)
    }, [contacts])

    useEffect(() => {
        initialFetch()
    }, [])

    const [stateIndex, setStateIndex] = useState(0)
    function handleTab(tab, index) {
        setPage(1)
        tab === selectedTab ? setSelectedTab('All Messages') : setSelectedTab(tab)
        stateIndex === index ? setStateIndex(0) : setStateIndex(index)
    }

    return (
        <DashBoard>
            <TopMenu>
                <TabsContainer>
                    {tabs.map((tab, index) => {
                        return tab !== 'All Messages' && <Tab $active={index === stateIndex && true} key={index} onClick={() => handleTab(tab, index)}>{tab}</Tab>
                    })}
                </TabsContainer>
            </TopMenu>
            {editing ? <Box sx={{ position: "absolute", left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}><CircularProgress /></Box> : ''}
            {fetched ?
                <div>
                    <DataTable data={pageData} columns={columns} actions={actions} noPointer />
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
                </div>
                : <LinearProgress />}
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>
    )
}

export default Contact