import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Student } from '../../env';
import { addStudent, getStudent, updStudent } from './studentsAPI';

interface studentState {
    name: string;
    email:string;
    english?:number;
    math?:number;
    computers?:number;
    students?:Student[];
    refresh:boolean;
    status?:string;
}

const initialState: studentState = {
    name: "",
    email:"",
    refresh:false
};

export const getStudentAsync = createAsyncThunk(
    'students/getStudent',
    async (id?:number) => {
        const res = await getStudent(id);
        return res.data;
    }
)

export const addStudentAsync = createAsyncThunk(
    'students/addStudent',
    async (student:Student) => {
        const res = await addStudent(student);
        return res.data;
    }
)

export const updStudentAsync = createAsyncThunk(
    'students/updStudent',
    async (student:Student) => {
        const res = await updStudent(student);
        return res.data;
    }
)

const studntsSlice = createSlice({
    name: 'studnts',
    initialState,
    reducers: {
        searchStud:(state,inputValue:PayloadAction<string>)=>
        {
            
        }
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(getStudentAsync.fulfilled,(state,action:PayloadAction<Student[]>)=>
        {
            state.students = action.payload
        })
        .addCase(addStudentAsync.fulfilled,(state,action:PayloadAction<string>)=>
        {
            state.status = action.payload
            state.refresh = !state.refresh
        })
        .addCase(updStudentAsync.fulfilled,(state,action:PayloadAction<string>)=>
        {
            state.status = action.payload
            state.refresh = !state.refresh
        })
    }
});

export const {searchStud} = studntsSlice.actions;
export const selectStudents = (state:RootState) => state.students.students;
export const selectrefresh = (state:RootState) => state.students.refresh;
export const selectstatus = (state:RootState) => state.students.status;
export default studntsSlice.reducer;