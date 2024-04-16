import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';
import { contactsData } from '../features/contacts/contactsSlice';
import usePaginate from '../../hooks/usePaginate';
import { deleteContactById, fetchContacts, updateContact } from '../features/contacts/contactsThunk';
import { Tab, TabsContainer, TopMenu } from '../style/TopMenuStyled';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import Pagination from '../components/Pagination';
import { ContactData } from '../interfaces/Contacts';
import { useAppDispatch, useAppSelector } from '../app/hooks';

function Contact() {
    const [open, setOpen] = useState(false);
    const handleOpen = (e: SyntheticEvent, message: string) => {
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
    const dispatch = useAppDispatch()
    const columns = [
        {
            label: 'ID',
            display: (row: ContactData) =>
                <div>
                    <p># {row._id.slice(-8)}</p>
                </div>
        },
        {
            label: 'Date',
            display: (row: ContactData) =>
                <div>
                    <p>{new Date(Number(row.date)).toString().slice(0, 15)}</p>
                    <p>{new Date(Number(row.date)).toString().slice(0, 21).split(' ')[4]}</p>
                </div>
        },
        {
            label: 'Customer',
            display: (row: ContactData) =>
                <div className='twoLines'>
                    <p className='highlight'>{row.full_name}</p>
                    <p className='panelColor'>{row.phone}</p>
                    <p className='panelColor'>{row.email}</p>
                </div>
        },
        {
            label: 'Comment',
            display: (row: ContactData) =>
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
            display: (row: ContactData) =>
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

    const deleteContact = async (e: SyntheticEvent, contact: ContactData) => {
        e.stopPropagation()
        await dispatch(deleteContactById(contact._id)).unwrap()
        await dispatch(fetchContacts())
    }

    const editContact = async (e: SyntheticEvent, contact: ContactData) => {
        e.stopPropagation()
        setEditing(true)
        await dispatch(updateContact({
            ...contact,
            status: contact.status === 'Read' ? 'Unread' : 'Read'
        }))

    }

    const actions = [
        { name: 'Delete', handler: deleteContact },
        { name: 'Edit', handler: editContact },
    ]

    const allContacts = useAppSelector(contactsData)
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
        await dispatch(fetchContacts())
        setFetched(true)
    }

    useEffect(() => {
        if (editing) setEditing(false)
    }, [contacts])

    useEffect(() => {
        initialFetch()
    }, [])

    const [stateIndex, setStateIndex] = useState(0)
    function handleTab(tab: string, index: number) {
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
                    <Pagination currentPage={currentPage} setPage={setPage} totalPages={totalPages} />
                </div>
                : <LinearProgress />}
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>
    )
}

export default Contact