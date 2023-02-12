import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    const [profile, setProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0,
    })
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

        })

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }

    return (
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
    )
}