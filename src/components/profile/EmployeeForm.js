import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    const [feedback, setFeedback] = useState("")
    const [profile, setProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0,
    })

    
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    
    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(res => res.json())
        .then((data) => {
            const empObj = data[0]
            setProfile(empObj)

        })
    }, [])

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()

        fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then(() => {
            setFeedback("Employee profile saved")
        })
    }

    return ( <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
    </div>
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2)
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvt) => handleSaveButtonClick(clickEvt)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}