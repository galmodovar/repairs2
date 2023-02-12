import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import "./Employees.css"


export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [ employee, updateEmployee ] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(res => res.json())
            .then((data) => {
                const singleEmp = data[0]
                updateEmployee(singleEmp)
            })
        },
        [employeeId]
        )
    
    return <section className="employee" key={`employee--${employeeId}`}>
            <header className="employee__header">Name: {employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email} </div>
            <div>Rate: {employee?.rate}</div>
            <div>Specialty: {employee?.specialty}</div>
            <footer className="employee__footer">Currently working on {employee?.employeeTickets.length} tickets</footer>
          </section>

}