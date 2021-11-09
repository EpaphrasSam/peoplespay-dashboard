import { combineReducers } from '@reduxjs/toolkit'




const rootReducer = combineReducers({
    authSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;