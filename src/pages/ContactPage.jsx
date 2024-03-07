import contacts from '../assets/data/contacts.json'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"

function Contact() {
    const columns = [
        {
            label: 'Comment ID',
            property: 'id'
        },
        {
            label: 'Date',
            display: row => new Date(Number(row.date)).toLocaleDateString('es-Es')
        },
        {
            label: 'Customer',
            display: row =>
                <div>
                    <p>{row.full_name}</p>
                    <p>{row.phone}</p>
                    <p>{row.email}</p>
                </div>
        },
        {
            label: 'Comment',
            display: row =>
                <div>
                    <h5>{row.subject}</h5>
                    <p>{row.message.slice(0, 55)} ...</p>
                </div>
        },
        {
            label: 'Status',
            property: 'status'
        }
    ]

    return (
        <DashBoard>
            <DataTable data={contacts} columns={columns} />
        </DashBoard>
    )
}

export default Contact