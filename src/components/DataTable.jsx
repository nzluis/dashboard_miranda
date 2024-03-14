import { useLocation, useNavigate } from "react-router-dom"
import { StyledTable, StyledTableBody, StyledTableHead, TdActions } from "../style/TableStyled"
import { FiEdit, FiXCircle } from "react-icons/fi";

export default function DataTable({ data, columns, actions, position, noPointer }) {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <StyledTable>
            <StyledTableHead>
                <tr>
                    {columns.map((column, index) => <th key={index}>{column.label}</th>)}
                    {actions ? <th>Edit/Del</th> : null}
                </tr>
            </StyledTableHead>

            <StyledTableBody $position={position} $noPointer={noPointer}>
                {data.map((row, index) => {
                    return (
                        <tr key={index} onClick={() => pathname === '/bookings' && navigate(`${pathname}/${row.id}`)}>
                            {columns.map((column, i) => {
                                return (
                                    <td key={i}  >
                                        {row[column.property] ? row[column.property] : column.display(row)}
                                    </td>
                                )
                            })}
                            {actions ?
                                <TdActions>
                                    <FiEdit size={26} onClick={(e) => actions[1].handler(e, row)} />
                                    <FiXCircle size={26} onClick={(e) => actions[0].handler(e, row)} />
                                </TdActions>
                                :
                                null
                            }
                        </tr>
                    )
                })}
            </StyledTableBody>
        </StyledTable>
    )
}