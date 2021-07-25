import { Reducer, AnyAction } from 'redux'
import { State } from '../models/interfaces/state'

import * as ActionTypes from './actionTypes'

const initialState: State = {
	userLogged: undefined,
	movements: undefined,
}

const reducer: Reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionTypes.LOGIN:
		case ActionTypes.REGISTER:
			return { ...state, userLogged: action.payload }

		case ActionTypes.GET_MOVEMENTS:
			return { ...state, movements: action.payload }
		default:
			return state
	}
}

export default reducer
