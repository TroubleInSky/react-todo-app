import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from "redux";
import {user} from "../store/User";
import { item, itemSettings } from '../store/Item';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storage = createStore(combineReducers({
    user, item, itemSettings
}), composeEnhancers(
    applyMiddleware(thunk)
));

export default storage;