import { UserDto } from '../models/interfaces/auth'

export const isLogged = (userLogged: UserDto | undefined): boolean => {
	return userLogged !== undefined
}
