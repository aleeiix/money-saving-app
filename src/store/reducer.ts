import { Reducer, AnyAction } from 'redux'
import { State } from '../models/interfaces/state'

import * as ActionTypes from './actionTypes'

const initialState: State = {
	userLogged: undefined,
	movementsMonth: undefined,
}

const reducer: Reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionTypes.LOGIN:
		case ActionTypes.REGISTER:
			return { ...state, userLogged: action.payload }

		case ActionTypes.LOGOUT:
			return { ...state, userLogged: undefined }

		case ActionTypes.GET_MOVEMENTS_MONTH:
			return { ...state, movementsMonth: action.payload }

		case ActionTypes.ADD_MOVEMENT:
			return {
				...state,
				movementsMonth: [action.payload, ...state.movementsMonth],
			}

		default:
			return state
	}
}

export default reducer
