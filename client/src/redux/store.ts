// Store
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from './reducers'

const initState = {}

const middlewares = [thunk]

export const store = createStore(
  rootReducers,
  initState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export type RootState = ReturnType<typeof store.getState>
