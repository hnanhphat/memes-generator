import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import memeReducer from "./meme.reducer";
import routeReducer from "./route.reducer";

export default combineReducers({
  auth: authReducer,
  meme: memeReducer,
  route: routeReducer,
});
