import { Dispatch } from 'redux'
import { auth } from './firebase'
import { getUserById } from './authService'
import * as ActionTypes from '../store/actionTypes'

export const isLogged = (dispatch: Dispatch): Promise<boolean> => {
	return new Promise(resolve => {
		auth.onAuthStateChanged(async user => {
			if (user) {
				const userLogged = await getUserById(user.uid)
				dispatch({ type: ActionTypes.LOGIN, payload: userLogged })
				resolve(true)
			} else {
				dispatch({ type: ActionTypes.LOGIN, payload: null })
				resolve(false)
			}
		})
	})
}

export const isNotLogged = async (dispatch: Dispatch): Promise<boolean> => {
	const isLoggedResult = await isLogged(dispatch)

	return !isLoggedResult
}
