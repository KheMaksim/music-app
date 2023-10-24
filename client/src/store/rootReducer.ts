import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";
import { musicReducer } from "@/features/musicSlice";

const rootReducer = combineReducers({
    music: musicReducer,
    user: userReducer,
});

export default rootReducer;
