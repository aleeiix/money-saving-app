/* eslint-disable no-unused-vars */
export enum MovementTypeEnum {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE',
}

export enum ExpenseTypeEnum {
	PRIMARY = 'PRIMARY',
	WHIM = 'WHIM',
}

export interface NewMovementDto {
	money: number
	type: MovementTypeEnum
	expenseType?: ExpenseTypeEnum
}

export interface MovementDto {
	id: string
	money: number
	type: MovementTypeEnum
	expenseType?: ExpenseTypeEnum
	date: Date
}
