import { createSlice } from '@reduxjs/toolkit';

const theamSlice = createSlice({
    name: 'theam',
    initialState: {
        theam: "Architecture"
    },
    reducers: {
        setCurTheam: (state, action) => {
            state.theam = action.payload.theam
        },
    }
})
    
export const { setCurTheam } = theamSlice.actions;
    
export default theamSlice;