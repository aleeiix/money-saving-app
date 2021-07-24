import { Reducer, AnyAction } from 'redux'
import { State } from '../models/interfaces/state'

import * as ActionTypes from './actionTypes'

const initialState: State = {
	userLogged: undefined,
}

const reducer: Reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionTypes.LOGIN:
		case ActionTypes.REGISTER:
			return { ...state, userLogged: action.payload }

		default:
			return state
	}
}

export default reducer
