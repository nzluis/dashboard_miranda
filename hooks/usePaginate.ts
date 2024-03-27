import { useMemo, useState } from "react";
import { BookingData } from '../src/interfaces/Bookings';
import { RoomData } from '../src/interfaces/Rooms';
import { UserData } from '../src/interfaces/Users';
import { ContactData } from '../src/interfaces/Contacts';

export default function usePaginate(data: BookingData[] | RoomData[] | UserData[] | ContactData[]) {
    const [currentPage, setPage] = useState(1)
    const pageSize = 10
    const pageData = useMemo(() => {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }, [data, currentPage])

    return { pageData, currentPage, setPage }
}