import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

let middlewares

if (process.env.REACT_APP_PRODUCTION === 'true') {
	middlewares = applyMiddleware(thunk)
} else {
	middlewares = composeWithDevTools(applyMiddleware(thunk, logger))
}

const store = createStore(reducer, middlewares)

export default store
