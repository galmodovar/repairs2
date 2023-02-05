import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [search, setSearch] = useState("")

    return <>
        <TicketSearch setterFunction={setSearch} />
        <TicketList searchState={search} />
        </>
}