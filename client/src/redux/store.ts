// Store
import { createStore, compose, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import rootReducers from './reducers'

const initState = {}

export const store = createStore(rootReducers, initState, compose(applyMiddleware(thunk)))