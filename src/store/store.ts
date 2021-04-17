import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  saveToLocalStorage,
  saveAuthToLocalStorage,
} from "./action-creators/saveLocalStorage";
import { rootReducer } from "./reducers";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState().settings, "settings");
  saveAuthToLocalStorage(store.getState().auth);
});

export default store;
