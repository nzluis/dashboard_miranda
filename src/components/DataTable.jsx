export default function DataTable({ data, columns }) {
    return (
        <div>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((column, index) => <th key={index}>{column.label}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => {
                        return <tr key={index}>
                            {columns.map((column, i) => {
                                return (
                                    <td key={i}>
                                        {row[column.property] ? row[column.property] : column.display(row)}
                                    </td>
                                )
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}