import { UserDto } from './auth'
import { MovementDto } from './movement'

export interface State {
	userLogged?: UserDto
	movements?: MovementDto[]
}
