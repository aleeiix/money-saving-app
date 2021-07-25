/* eslint-disable no-unused-vars */
export enum MovementTypeEnum {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE',
}

export interface NewMovementDto {
	money: number
	type: MovementTypeEnum
}

export interface MovementDto {
	id: string
	money: number
	type: MovementTypeEnum
	date: Date
}
