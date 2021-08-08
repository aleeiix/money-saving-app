import { FC, useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import {
	ExpenseTypeEnum,
	MovementDto,
	MovementTypeEnum,
} from '../../../models/interfaces/movement'
import styled from 'styled-components'

interface Props {
	movements?: MovementDto[]
}

const TypographyNumber = styled(Typography)<{ positive: string }>`
	color: ${props =>
		props.positive === 'true'
			? 'rgba(40, 167, 69, 0.8)'
			: 'rgba(220, 53, 69, 0.8)'};
`

const ResumeMovements: FC<Props> = ({ movements }) => {
	const [profits, setProfits] = useState<number | undefined>()
	const [expenses, setExpenses] = useState<number | undefined>()
	const [result, setResult] = useState<number | undefined>()

	const [primaryExpense, setPrimaryExpense] = useState<number | undefined>()
	const [whimExpense, setWhimExpense] = useState<number | undefined>()
	const [saving, setSaving] = useState<number | undefined>()

	useEffect(() => {
		let income = 0
		let expensesTotal = 0
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
				expensesTotal += Number(movement.amount)
			}
		})

		setProfits(income)
		setExpenses(expensesTotal)
		setResult(income - expensesTotal)

		setPrimaryExpense((100 * Number(expensesPrimary)) / Number(income) || 0)
		setWhimExpense((100 * Number(expensesWhim)) / Number(income) || 0)
		setSaving(
			100 - (100 * Number(expensesPrimary + expensesWhim)) / Number(income) || 0
		)
	}, [movements])

	return (
		<>
			<Box display='flex' mb={2}>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					mr={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Ganancias
							</Typography>
							<TypographyNumber align='center' positive='true'>
								{profits?.toFixed(2)}€
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					ml={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Gastos
							</Typography>
							<TypographyNumber align='center' positive='false'>
								{expenses?.toFixed(2)}€
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					ml={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Resultado
							</Typography>
							<TypographyNumber
								align='center'
								positive={(result || 0) > 0 ? 'true' : 'false'}
							>
								{result?.toFixed(2)}€
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
			</Box>
			<Box display='flex'>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					mr={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Primarios <small>(50%)</small>
							</Typography>
							<TypographyNumber
								align='center'
								positive={(primaryExpense || 0) < 50 ? 'true' : 'false'}
							>
								{primaryExpense?.toFixed(2)}%
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					ml={1}
					mr={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Caprichos <small>(30%)</small>
							</Typography>
							<TypographyNumber
								align='center'
								positive={(whimExpense || 0) < 30 ? 'true' : 'false'}
							>
								{whimExpense?.toFixed(2)}%
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					flexGrow={1}
					flexShrink={1}
					flexBasis={1}
					ml={1}
				>
					<Card>
						<CardContent>
							<Typography variant='subtitle2' align='center'>
								Ahorros <small>(20%)</small>
							</Typography>
							<TypographyNumber
								align='center'
								positive={(saving || 0) > 20 ? 'true' : 'false'}
							>
								{saving?.toFixed(2)}%
							</TypographyNumber>
						</CardContent>
					</Card>
				</Box>
			</Box>
		</>
	)
}

export default ResumeMovements
