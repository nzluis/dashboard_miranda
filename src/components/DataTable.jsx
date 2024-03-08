import { useLocation, useNavigate } from "react-router-dom"
import { StyledTable, StyledTableBody, StyledTableHead } from "../style/TableStyled"

export default function DataTable({ data, columns, position, nopointer }) {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <StyledTable>
            <StyledTableHead>
                <tr>
                    {columns.map((column, index) => <th key={index}>{column.label}</th>)}
                </tr>
            </StyledTableHead>

            <StyledTableBody position={position} nopointer={nopointer}>
                {data.map((row, index) => {
                    return (
                        <tr key={index} onClick={() => pathname !== '/contact' && navigate(`${pathname}/${row.id}`)}>
                            {columns.map((column, i) => {
                                return (
                                    <td key={i}  >
                                        {row[column.property] ? row[column.property] : column.display(row)}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </StyledTableBody>
        </StyledTable>
    )
}