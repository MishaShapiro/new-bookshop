import { createSlice } from '@reduxjs/toolkit';

interface UserType {
    mail: string,
    pass: string,
    name: string,
    info: string,
}

interface StateType {
    data: UserType,
    allUsers: UserType[]
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            mail: "",
            pass: "",
            name: "",
            info: "",
        },
        allUsers: [
            
        ]
    },
    reducers: {
        setUser: (state : StateType, action) => {
            const currentUser = state.allUsers.filter((user : UserType) => {
                return (user.mail === action.payload.data.mail && user.pass === action.payload.data.pass)
            })[0]
            state.data = currentUser
        },
        addUser: (state : StateType, action) => {
            state.allUsers.push(action.payload.newUser)
        },
        editAllUser: (state: StateType, action) => {
            state.allUsers = action.payload.allUsers
        },
        quit: (state) => {
            state.data = {
                mail: "",
                pass: "",
                name: "",
                info: "",
            }
        },
        upload: (state) => {
            state = {
                data: {
                    mail: "",
                    pass: "",
                    name: "",
                    info: "",
                },
                allUsers: [

                ]
            }
            return state
        }
    }
})
    
export const { setUser, upload, quit, addUser, editAllUser } = userSlice.actions;
    
export default userSlice;