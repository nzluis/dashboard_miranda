import users from '../../users.json'
import DataTable from "../components/DataTable"

function Users() {
    const columns = [
        {
            label: "Name",
            display: row =>
                <div style={{ display: 'flex' }}>
                    <img src={row.photo} />
                    <div>
                        <p>{row.full_name}</p>
                        <p>{row.id}</p>
                        <p>joined on {row.start_date}</p>
                        <p>{row.email}</p>
                    </div>
                </div>
        },
        {
            label: 'Description',
            display: row => `${row.description.slice(0, 10)} ...`
        },
        {
            label: 'Contact',
            property: 'contact'
        },
        {
            label: 'Status',
            property: 'status'
        },
    ]

    return (
        <div style={{ overflow: 'scroll' }}>
            <h1>Users</h1>
            <DataTable data={users} columns={columns} />
        </div>
    )
}

export default Users