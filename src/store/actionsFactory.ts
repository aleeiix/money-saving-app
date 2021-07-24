import { Dispatch } from 'redux'

import { LoginDto, RegisterDto } from '../models/interfaces/auth'
import * as ActionTypes from './actionTypes'
import * as AuthService from '../services/authService'
import history from '../utils/history'
import * as Routes from '../models/constants/routes'

export const login =
	(user: LoginDto) =>
	async (dispatch: Dispatch): Promise<void> => {
		const userLogged = await AuthService.login(user)

		dispatch({ type: ActionTypes.LOGIN, payload: userLogged })

		history.push(Routes.ROOT)
	}

export const register =
	(newUser: RegisterDto) =>
	async (dispatch: Dispatch): Promise<void> => {
		const userLogged = await AuthService.register(newUser)

		dispatch({ type: ActionTypes.REGISTER, payload: userLogged })

		history.push(Routes.ROOT)
	}

export const signInWithGoogle =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		const userLogged = await AuthService.signInWithGoogle()

		dispatch({ type: ActionTypes.LOGIN, payload: userLogged })

		history.push(Routes.ROOT)
	}
