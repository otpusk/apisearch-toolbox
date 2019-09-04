import { createStore } from 'redux';
import { middleware, runSaga } from "./middleware";
import { reducer } from "./reducer";

export const store = createStore(
    reducer,
    middleware
);
runSaga();
