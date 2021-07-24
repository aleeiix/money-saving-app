export interface LoginDto {
	email: string
	password: string
}

export interface RegisterDto {
	displayName: string
	email: string
	password: string
	repeatPassword: string
}

export interface UserDto {
	uid: string
	displayName: string
	email: string
}
