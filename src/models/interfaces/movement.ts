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
	type: MovementTypeEnum
	expenseType?: ExpenseTypeEnum
	subtype: string
	description?: string
	amount: number
}

export interface MovementDto {
	id: string
	type: MovementTypeEnum
	expenseType?: ExpenseTypeEnum
	subtype: string
	description?: string
	amount: number
	date: Date
}
