import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

let middlewares = null

if (process.env.REACT_APP_PRODUCTION === 'true') {
	middlewares = applyMiddleware()
} else {
	middlewares = composeWithDevTools(applyMiddleware(logger))
}

const store = createStore(reducer, middlewares)

export default store
