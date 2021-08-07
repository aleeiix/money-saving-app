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
import Autocomplete from '@material-ui/lab/Autocomplete'

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
		amount: 0,
	})

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
		handleSubmit(movement)
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Añadir movimiento</DialogTitle>
			<DialogContent dividers>
				<form>
					<Box>
						<FormControl variant='outlined' fullWidth>
							<InputLabel>Tipo de movimiento</InputLabel>
							<Select
								name='type'
								value={movement.type}
								onChange={handleChange}
								label='Tipo de movimiento'
							>
								<MenuItem value={MovementTypeEnum.INCOME}>Ingreso</MenuItem>
								<MenuItem value={MovementTypeEnum.EXPENSE}>Gasto</MenuItem>
							</Select>
						</FormControl>
					</Box>
					{movement.type === MovementTypeEnum.EXPENSE && (
						<Box mt={2}>
							<FormControl variant='outlined' fullWidth>
								<InputLabel>Tipo de gasto</InputLabel>
								<Select
									name='expenseType'
									value={movement.expenseType || ''}
									onChange={handleChange}
									label='Tipo de gasto'
								>
									<MenuItem value={ExpenseTypeEnum.PRIMARY}>Primario</MenuItem>
									<MenuItem value={ExpenseTypeEnum.WHIM}>Capricho</MenuItem>
								</Select>
							</FormControl>
						</Box>
					)}
					<Box mt={2}>
						<FormControl variant='outlined' fullWidth>
							<Autocomplete
								freeSolo
								options={
									movement.type === MovementTypeEnum.INCOME
										? subtypesIncome
										: subtypesExpense
								}
								renderInput={params => (
									<TextField
										{...params}
										label='Subtipo'
										name='subtype'
										variant='outlined'
										fullWidth
									/>
								)}
							/>
						</FormControl>
					</Box>
					<Box mt={2}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel>Cantidad</InputLabel>
							<OutlinedInput
								name='amount'
								value={movement.amount}
								type='number'
								onChange={handleChange}
								endAdornment={<InputAdornment position='end'>€</InputAdornment>}
								label='Cantidad'
							/>
						</FormControl>
					</Box>
				</form>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={handleSubmitEvent}>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddMovement
