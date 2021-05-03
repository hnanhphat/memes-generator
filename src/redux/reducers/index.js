import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import memeReducer from "./meme.reducer";

export default combineReducers({ auth: authReducer, meme: memeReducer });
