import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import productsReducer from './reducers/products';
import {composeWithDevTools} from 'redux-devtools-extension';
import cartReducer from './reducers/cart';
import ordersReducer from "./reducers/orders";
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';


const rootReducer = combineReducers({
    products : productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
});

export default store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk), composeWithDevTools()));