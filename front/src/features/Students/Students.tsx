import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { Student } from '../../env';
import { addStudentAsync, getStudentAsync, selectrefresh, selectstatus, selectStudents,updStudentAsync } from './studentSlicer';


const Students = () => {
    const dispatch = useAppDispatch();
    const students = useSelector(selectStudents);
    const refresh = useSelector(selectrefresh);
    const status = useSelector(selectstatus);
    console.log(status)
    useEffect(() => {
        dispatch(getStudentAsync())
    }, [refresh,dispatch])

    const [math, setmath] = useState("0")
    const [english, setenglish] = useState("0")
    const [computer, setcomputer] = useState("0")

    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    const [Query, setQuery] = useState("")

    return (
        <div>
            Student's name - <input onKeyUp={(e)=>setname(e.currentTarget.value)}/><br />
            Student's Email -<input onKeyUp={(e)=>setemail(e.currentTarget.value)}/><br />
            {(name && email) === "" ? <p style={{color:'red',fontSize:'18px'}}>Please Fill all fields</p>:<button onClick={()=>{const stu = new Student(name,email,+english,+math,+computer,0);dispatch(addStudentAsync(stu));setname("");setemail("")}}>Add Student</button>}
            {(status === 'Student added' || status === 'Student updated') ? <p style={{color:'green',fontSize:'18px'}}>{status}</p>:<p style={{color:'red',fontSize:'18px'}}>{status}</p>}
            <hr/>
            <input onKeyUp={(e)=>{setQuery(e.currentTarget.value);}} placeholder="Search for names.." title="Type in a name"/><br/><br/>
            {students?.filter((stud)=> Query === '' ? stud:stud.name.toLowerCase().includes(Query.toLowerCase()))[0] ? 
            <table style={{width:'100%'}}>
                <tbody >
                    <tr>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Math</th>
                        <th>English</th>
                        <th>computers</th>
                    </tr>
                    {students?.filter((stud)=>
                    Query === '' ? stud:stud.name.toLowerCase().includes(Query.toLowerCase()))
                    .map((stud, i) =>
                    <tr key={i}>
                        <td>{(stud.grades.math && stud.grades.english && stud.grades.computer) !== 0 ? <div style={{color:'green',fontSize:'18px'}}>All Grades submitted</div>:<button onClick={()=>{const stu = new Student(name,email,+english,+math,+computer,stud.id);dispatch(updStudentAsync(stu));setmath('');setcomputer('');setmath('')}}>Update Grades</button>}</td>
                        <td>{stud.name}</td>
                        <td>{stud.email}</td>
                        <td>{stud.grades.math === 0 ? <input onKeyUp={(e) => setmath(e.currentTarget.value)} /> : stud.grades.math}</td>
                        <td>{stud.grades.english === 0 ? <input onKeyUp={(e) => setenglish(e.currentTarget.value)} /> : stud.grades.english}</td>
                        <td>{stud.grades.computer === 0 ? <input onKeyUp={(e) => setcomputer(e.currentTarget.value)} /> : stud.grades.computer}</td>
                    </tr>)}
                </tbody>
            </table>:<h1>No Student's found</h1>}
        </div>
    )
}

export default Students