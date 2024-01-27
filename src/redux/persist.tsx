{/* <reference types="redux-persist" /> */}
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root', //Название ключа в localStorage
	storage,
}

export default persistConfig