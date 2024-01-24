import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            mail: "",
            pass: "",
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})
    
export const { setUser } = userSlice.actions;
    
export default userSlice;