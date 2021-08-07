import { FC, useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import {
	ExpenseTypeEnum,
	MovementDto,
	MovementTypeEnum,
} from '../../../models/interfaces/movement'

interface Props {
	movements?: MovementDto[]
}

const ResumeMovements: FC<Props> = ({ movements }) => {
	const [primaryExpense, setPrimaryExpense] = useState<number | undefined>()
	const [whimExpense, setWhimExpense] = useState<number | undefined>()
	const [saving, setSaving] = useState<number | undefined>()

	useEffect(() => {
		let income = 0
		let expensesPrimary = 0
		let expensesWhim = 0

		movements?.forEach(movement => {
			if (movement.type === MovementTypeEnum.INCOME) {
				income += Number(movement.amount)
			} else {
				if (movement.expenseType === ExpenseTypeEnum.PRIMARY) {
					expensesPrimary += Number(movement.amount)
				} else {
					expensesWhim += Number(movement.amount)
				}
			}
		})

		setPrimaryExpense((100 * Number(expensesPrimary)) / Number(income) || 0)
		setWhimExpense((100 * Number(expensesWhim)) / Number(income) || 0)
		setSaving(
			100 - (100 * Number(expensesPrimary + expensesWhim)) / Number(income) || 0
		)
	}, [movements])

	return (
		<Box display='flex'>
			<Box display='flex' flexGrow={1} flexShrink={1} flexBasis={1} mr={1}>
				<Card>
					<CardContent>
						<Typography variant='subtitle2' align='center'>
							Primarios <small>(50%)</small>
						</Typography>
						<Typography align='center'>{primaryExpense?.toFixed(2)}%</Typography>
					</CardContent>
				</Card>
			</Box>
			<Box display='flex' flexGrow={1} flexShrink={1} flexBasis={1} ml={1} mr={1}>
				<Card>
					<CardContent>
						<Typography variant='subtitle2' align='center'>
							Caprichos <small>(30%)</small>
						</Typography>
						<Typography align='center'>{whimExpense?.toFixed(2)}%</Typography>
					</CardContent>
				</Card>
			</Box>
			<Box display='flex' flexGrow={1} flexShrink={1} flexBasis={1} ml={1}>
				<Card>
					<CardContent>
						<Typography variant='subtitle2' align='center'>
							Ahorros <small>(20%)</small>
						</Typography>
						<Typography align='center'>{saving?.toFixed(2)}%</Typography>
					</CardContent>
				</Card>
			</Box>
		</Box>
	)
}

export default ResumeMovements
