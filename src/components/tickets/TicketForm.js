import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
   
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const newServiceTicket = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        return fetch(`http://localhost:8088/serviceTickets`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newServiceTicket)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (e) => {
                                const copy = { ...ticket }
                                copy.description = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (e) => {
                                const copy = { ...ticket }
                                copy.emergency = e.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(e) => handleSaveButtonClick(e)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}