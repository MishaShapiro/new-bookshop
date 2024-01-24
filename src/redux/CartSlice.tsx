import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        books: [{
                id: 0,
                name: "book",
            }
        ]
    },
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            state.books.filter((item) => {
                return item.id == action.payload.id
            })
        }
    }
})
    
export const { addBook, deleteBook } = cartSlice.actions;
    
export default cartSlice;