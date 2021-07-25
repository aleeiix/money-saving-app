import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Fab, Card, CardContent, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'

import { State } from '../../models/interfaces/state'
import AddMovement from '../../components/dialog/AddMovement/AddMovement'
import { NewMovementDto } from '../../models/interfaces/movement'
import { addMovement, getMovements } from '../../store/actionsFactory'
import CardMovement from '../../components/movements/CardMovement/CardMovement'

const FabStyled = styled(Fab)`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
`

const Home: FC = () => {
	const dispatch = useDispatch()
	const userLogged = useSelector((state: State) => state.userLogged)
	const movements = useSelector((state: State) => state.movements)

	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (userLogged?.uid) {
			dispatch(getMovements(userLogged.uid))
		}
	}, [userLogged])

	const handleOpenAddMovement = () => {
		setOpen(true)
	}

	const handleCloseAddMovement = () => {
		setOpen(false)
	}

	const handleSubmitAddMovement = (movement: NewMovementDto) => {
		if (userLogged?.uid) {
			dispatch(addMovement(movement, userLogged.uid))
			handleCloseAddMovement()
		}
	}

	return (
		<>
			<Box display='flex' justifyContent='center' mb={4}>
				<Card>
					<CardContent>
						<Typography variant='h5'>
							Hola <strong>{userLogged?.displayName}</strong>
						</Typography>
					</CardContent>
				</Card>
			</Box>

			<Typography variant='h6'>Resumen del mes</Typography>
			{movements?.map(movement => (
				<CardMovement key={movement.id} movement={movement} />
			))}

			<FabStyled color='primary' onClick={handleOpenAddMovement}>
				<AddIcon></AddIcon>
			</FabStyled>

			<AddMovement
				open={open}
				handleClose={handleCloseAddMovement}
				handleSubmit={handleSubmitAddMovement}
			></AddMovement>
		</>
	)
}

export default Home
