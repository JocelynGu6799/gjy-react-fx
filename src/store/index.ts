import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import { type } from "os";
const storegjy=configureStore({
    reducer:{
        user
    }
})
export default storegjy
export type RootState=ReturnType<typeof storegjy.getState>;