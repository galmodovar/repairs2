import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"


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
            <div>Name: {employee.user.fullName}</div>
            <div>Email: </div>
            <div>id: {employee.userId}</div>
          </section>

}