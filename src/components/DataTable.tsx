import { useLocation, useNavigate } from "react-router-dom"
import { StyledTable, StyledTableBody, StyledTableHead, TdActions } from "../style/TableStyled"
import { FiEdit, FiXCircle } from "react-icons/fi";
import { RoomData } from "../interfaces/Rooms";
import { BookingData } from "../interfaces/Bookings";
import { ContactData } from "../interfaces/Contacts";
import { UserData } from "../interfaces/Users";

interface DataTableProps {
    data: BookingData[] | RoomData[] | ContactData[] | UserData[]
    columns: { label: string, property?: string, display?: Function }[]
    actions: { name: string, handler: Function }[]
    position?: string
    noPointer?: boolean
}

export default function DataTable({ data, columns, actions, position, noPointer }: DataTableProps) {
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

            <StyledTableBody $position={position as string} $noPointer={noPointer as boolean}>
                {data.map((row: BookingData | RoomData | UserData | ContactData, index: number) => {
                    return (
                        <tr key={index} onClick={() => pathname === '/bookings' && navigate(`${pathname}/${row.id}`)}>
                            {columns.map((column, i) => {
                                return (
                                    <td key={i}  >
                                        {row[column.property as keyof BookingData & keyof RoomData & keyof ContactData & keyof UserData] ? row[column.property as keyof BookingData & keyof RoomData & keyof ContactData & keyof UserData] : column.display!(row)}
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