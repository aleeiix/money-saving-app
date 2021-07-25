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
} from '@material-ui/core'
import {
	ExpenseTypeEnum,
	MovementTypeEnum,
	NewMovementDto,
} from '../../../models/interfaces/movement'

interface Props {
	open: boolean
	handleClose: () => void
	handleSubmit: (movement: NewMovementDto) => void
}

const AddMovement: FC<Props> = ({ open, handleClose, handleSubmit }) => {
	const [movement, setMovement] = useState<NewMovementDto>({
		type: MovementTypeEnum.INCOME,
		expenseType: undefined,
		money: 0,
	})

	const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
		const {
			target: { name, value },
		} = e

		if (name) {
			setMovement({ ...movement, [name]: value })
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
							<InputLabel>Cantidad</InputLabel>
							<OutlinedInput
								name='money'
								value={movement.money}
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
