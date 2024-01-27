import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        books: [{
            id: "No Data",
            count: 0,
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
        changeIndex: (state, action) => {
            if (state.books[0].id !== "No Data") { // Обновить счётчик для выбранной книги
                state.books.map((value) => {
                    if (value.id === action.payload.id) {
                        value.count = action.payload.count
                        return value
                    } else {
                        return value
                    }
                })
                state.books = state.books.filter((value) => { // Удалить все книги с 0
                    return value.count > 0
                })
                if (state.books.length === 0) {
                    state.books = [{
                        id: "No Data",
                        count: 0,
                    }]
                }
            } else {
                state.books = [{
                    id: "No Data",
                    count: 0,
                }]
            }
        }
    }
})
    
export const { addBook, changeIndex } = cartSlice.actions;
    
export default cartSlice;