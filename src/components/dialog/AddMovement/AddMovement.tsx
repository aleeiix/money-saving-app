import { FC, useState, ChangeEvent } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	Box,
	TextField,
} from '@material-ui/core'

import {
	ExpenseTypeEnum,
	MovementTypeEnum,
	NewMovementDto,
} from '../../../models/interfaces/movement'
import {
	subtypesIncome,
	subtypesExpense,
} from '../../../models/constants/movements'

interface Props {
	open: boolean
	handleClose: () => void
	handleSubmit: (movement: NewMovementDto) => void
}

const AddMovement: FC<Props> = ({ open, handleClose, handleSubmit }) => {
	const [movement, setMovement] = useState<NewMovementDto>({
		type: MovementTypeEnum.INCOME,
		expenseType: ExpenseTypeEnum.PRIMARY,
		subtype: '',
		description: '',
		amount: 0,
	})

	const handleCloseEmit = () => {
		setMovement({
			type: MovementTypeEnum.INCOME,
			expenseType: ExpenseTypeEnum.PRIMARY,
			subtype: '',
			description: '',
			amount: 0,
		})
		handleClose()
	}

	const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
		const {
			target: { name, value },
		} = e

		if (name) {
			setMovement(state => ({ ...state, [name]: value }))
			if (name === 'type' || name === 'expenseType') {
				setMovement(state => ({ ...state, subtype: '' }))
			}
		}
	}

	const handleSubmitEvent = () => {
		if (isValid()) {
			handleSubmit(movement)
		}
	}

	const isValid = () => {
		const { type, expenseType, subtype, amount } = movement
		return type === MovementTypeEnum.EXPENSE
			? type && subtype && amount
			: type && expenseType && subtype && amount
	}

	return (
		<Dialog open={open} onClose={handleCloseEmit}>
			<DialogTitle>Añadir movimiento</DialogTitle>
			<DialogContent dividers>
				<form>
					<Box>
						<FormControl variant='outlined' fullWidth>
							<InputLabel>Tipo de movimiento*</InputLabel>
							<Select
								name='type'
								value={movement.type}
								onChange={handleChange}
								label='Tipo de movimiento*'
							>
								<MenuItem value={MovementTypeEnum.INCOME}>Ingreso</MenuItem>
								<MenuItem value={MovementTypeEnum.EXPENSE}>Gasto</MenuItem>
							</Select>
						</FormControl>
					</Box>
					{movement.type === MovementTypeEnum.EXPENSE && (
						<Box mt={2}>
							<FormControl variant='outlined' fullWidth>
								<InputLabel>Tipo de gasto*</InputLabel>
								<Select
									name='expenseType'
									value={movement.expenseType || ''}
									onChange={handleChange}
									label='Tipo de gasto*'
								>
									<MenuItem value={ExpenseTypeEnum.PRIMARY}>Primario</MenuItem>
									<MenuItem value={ExpenseTypeEnum.WHIM}>Capricho</MenuItem>
								</Select>
							</FormControl>
						</Box>
					)}
					<Box mt={2}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel>Subtipo*</InputLabel>
							<Select
								name='subtype'
								value={movement.subtype || ''}
								onChange={handleChange}
								label='Subtipo*'
							>
								{(movement.type === MovementTypeEnum.INCOME
									? subtypesIncome
									: subtypesExpense
								).map(subtype => (
									<MenuItem key={subtype} value={subtype}>
										{subtype}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box mt={2}>
						<TextField
							label='Descripcion'
							name='description'
							value={movement.description || ''}
							onChange={handleChange}
							variant='outlined'
							fullWidth
						/>
					</Box>
					<Box mt={2}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel>Cantidad*</InputLabel>
							<OutlinedInput
								name='amount'
								value={movement.amount}
								type='number'
								onChange={handleChange}
								endAdornment={<InputAdornment position='end'>€</InputAdornment>}
								label='Cantidad*'
							/>
						</FormControl>
					</Box>
				</form>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleSubmitEvent} disabled={!isValid()}>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddMovement
