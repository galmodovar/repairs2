import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TicketList.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const navigate = useNavigate()


    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        ()=> {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            }
            else {
                setFilteredTickets(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets")
            .then(res => res.json())
            .then((data) => {
                setTickets(data)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFilteredTickets(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id )
                setFilteredTickets(myTickets)
            }
        },[tickets]
    )
    return <>
    {
        honeyUserObject.staff ? <> 
        <button
            onClick={
                () => {setEmergency(true)}
            }> Emergency Only
        </button>

        <button
        onClick={
            () => {setEmergency(false)}
        }> Show All
    </button></>
         : <button 
         onClick={() => navigate("/ticket/create")
        }> Create Ticket</button>
    }
    <h2>List of Tickets</h2>

    <article className='tickets'>
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className='ticket' key={`ticket--${ticket.id}`}>
                        <header> {ticket.description} </header>
                        <footer> Emergency: {ticket.emergency ? 'Yes' : 'No'} </footer>
                    </section>
                }
            )
        }
    </article>
    </> 

}
