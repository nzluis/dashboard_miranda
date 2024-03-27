import { Dispatch, SetStateAction } from "react"
import { ButtonSecondary } from "../style/ButtonStyled"
import { Page, PageSelected, Pages, PaginationContainer } from "../style/PaginatorStyled"

interface PaginationProps {
    currentPage: number
    setPage: Dispatch<SetStateAction<number>>
    totalPages: number
}

export default function Pagination({ currentPage, setPage, totalPages }: PaginationProps) {
    return (
        <PaginationContainer>
            {currentPage > 1 ? <ButtonSecondary onClick={() => setPage(currentPage - 1)}>Prev</ButtonSecondary> : <ButtonSecondary $notAllow disabled>Prev</ButtonSecondary>}
            <Pages>
                {[...Array(totalPages).keys()].map((page, index) => {
                    if (currentPage === page + 1) {
                        return <PageSelected key={index} onClick={() => setPage(page + 1)}>{page + 1}</PageSelected>
                    }
                    return <Page key={index} onClick={() => setPage(page + 1)}>{page + 1}</Page>
                })}
            </Pages>
            {currentPage < totalPages ? <ButtonSecondary onClick={() => setPage(currentPage + 1)}>Next</ButtonSecondary> : <ButtonSecondary $notAllow disabled>Next</ButtonSecondary>}
        </PaginationContainer>
    )
}