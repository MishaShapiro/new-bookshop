import { createSlice } from '@reduxjs/toolkit';

interface UserType {
    mail: string,
    pass: string,
    name: string,
    info: string,
    cart: any
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
            cart: [{
                id: "No Data",
                count: 0,
            }]
        },
        allUsers: [
            
        ]
    },
    reducers: {
        setUserCart: (state : StateType, action) => {
            state.allUsers.map((user) => {
                if (user.mail === action.payload.mail) {
                    user.cart = action.payload.cart
                }
            })
            state.data.cart = action.payload.cart
        },
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
                cart: [{
                    id: "No Data",
                    count: 0,
                }]
            }
        },
        upload: (state) => {
            state = {
                data: {
                    mail: "",
                    pass: "",
                    name: "",
                    info: "",
                    cart: [{
                        id: "No Data",
                        count: 0,
                    }]
                },
                allUsers: [

                ]
            }
            return state
        }
    }
})
    
export const { setUser, setUserCart, upload, quit, addUser, editAllUser } = userSlice.actions;
    
export default userSlice;