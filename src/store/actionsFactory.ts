import { Dispatch } from 'redux'

import { LoginDto, RegisterDto } from '../models/interfaces/auth'
import * as ActionTypes from './actionTypes'
import * as AuthService from '../services/authService'
import * as MovementService from '../services/movementService'

import history from '../utils/history'
import * as Routes from '../models/constants/routes'
import { NewMovementDto } from '../models/interfaces/movement'

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

export const addMovement =
	(movement: NewMovementDto, userUid: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		const newMovement = await MovementService.addMovement(movement, userUid)

		dispatch({ type: ActionTypes.ADD_MOVEMENT, payload: newMovement })
	}

export const getResumeMovements =
	(userUid: string) =>
	async (dispatch: Dispatch): Promise<void> => {
		const movements = await MovementService.getResumeMovements(userUid)

		dispatch({ type: ActionTypes.GET_MOVEMENTS, payload: movements })
	}
