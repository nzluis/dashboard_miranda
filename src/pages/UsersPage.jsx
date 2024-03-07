import users from '../assets/data/users.json'
import { DashBoard } from '../style/DashBoardStyled'
import DataTable from "../components/DataTable"

function Users() {
    const columns = [
        {
            label: "Name",
            display: row =>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <img src={row.photo} />
                    <div>
                        <p className='highlight'>{row.full_name}</p>
                        <p className='panelColor'>#{row.id}</p>
                        <p className='lighter'>joined on {row.start_date}</p>
                        <p className='lighter'>{row.email}</p>
                    </div>
                </div>
        },
        {
            label: 'Description',
            display: row =>
                <div className='moreLines'>
                    {row.description}
                </div>
        },
        {
            label: 'Contact',
            property: 'contact'
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

    return (
        <DashBoard>
            <DataTable data={users} columns={columns} />
        </DashBoard>
    )
}

export default Users