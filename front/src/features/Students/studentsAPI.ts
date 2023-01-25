import { MY_SERVER, Student} from '../../env'
import axios from 'axios'

export const getStudent = async (id:number = -1) => {
    const res = await axios.get(MY_SERVER + 'students/' + (+id))
    return res
}

export const addStudent = async (student:Student) => {
    const res = await axios.post(MY_SERVER + 'students',{"name":student.name,"email":student.email,"grades":{"math":student.grades.math,"english":student.grades.english,"computer":student.grades.computer}})
    return res
}

export const updStudent = async (student:Student) => {
    const res = await axios.put(MY_SERVER + 'students/'+ +student.id,{"grades":{"math":student.grades.math,"english":student.grades.english,"computer":student.grades.computer}})
    return res
}
