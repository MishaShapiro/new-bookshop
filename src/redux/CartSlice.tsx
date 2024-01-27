import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        books: [{
            id: "No Data"
        }]
    },
    reducers: {
        addBook: (state, action) => {
            if (state.books[0].id === "No Data") {
                state.books[0] = action.payload
            } else {
                state.books.push(action.payload)
            }
        },
        deleteBook: (state, action) => {
            if (state.books[0].id !== "No Data") {
                state.books.filter((item) => {
                    return item.id == action.payload.id
                })
                if (state.books.length === 0) {
                    state.books = [{
                        id: "No Data"
                    }]
                }
            } else {
                state.books = [{
                    id: "No Data"
                }]
            }
        }
    }
})
    
export const { addBook, deleteBook } = cartSlice.actions;
    
export default cartSlice;