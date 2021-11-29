import { configureStore } from "@reduxjs/toolkit";
import Auth from "./auth.state";
import Report from './report.state'
import Users from './users.state';
import Merchants from './merchant.state'
import Transactions from './transactions.state'

const state =configureStore(
    {
        reducer:{
            auth:Auth,
            report : Report,
            users : Users,
            merchants : Merchants,
            transactions : Transactions
        },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    }
)

export type RootState = ReturnType<typeof state.getState>
export default state;