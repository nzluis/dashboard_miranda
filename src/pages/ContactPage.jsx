import contacts from '../assets/data/contacts.json'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"
import { useState } from 'react';
import { ModalComponent } from '../components/ModalComponent';

function Contact() {
    const [open, setOpen] = useState(false);
    const handleOpen = (e, message) => {
        e.stopPropagation()
        setSelectedNote(message)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const [selectedNote, setSelectedNote] = useState('')
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

    return (
        <DashBoard>
            <DataTable data={contacts} columns={columns} nopointer="true" />
            <ModalComponent open={open} handleClose={handleClose} selectedNote={selectedNote} />
        </DashBoard>
    )
}

export default Contact