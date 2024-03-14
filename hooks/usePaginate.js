import { useMemo, useState } from "react";

export default function usePaginate(data) {
    const [currentPage, setPage] = useState(1)
    const pageSize = 10
    const pageData = useMemo(() => {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }, [data, currentPage])

    return { pageData, currentPage, setPage}
}