import { AnyAction } from 'redux'

import * as ActionTypes from './actionTypes'
import { UserDto } from '../models/interfaces/auth'
import { MovementDto } from '../models/interfaces/movement'

export const login = (user: UserDto): AnyAction => ({
	type: ActionTypes.LOGIN,
	payload: user,
})

export const register = (newUser: UserDto): AnyAction => ({
	type: ActionTypes.REGISTER,
	payload: newUser,
})

export const logout = (): AnyAction => ({
	type: ActionTypes.LOGOUT,
})

export const getMovementsMonth = (movements: MovementDto[]): AnyAction => ({
	type: ActionTypes.GET_MOVEMENTS_MONTH,
	payload: movements,
})

export const addMovement = (newMovement: MovementDto): AnyAction => ({
	type: ActionTypes.ADD_MOVEMENT,
	payload: newMovement,
})
