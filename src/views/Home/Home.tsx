import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'

import { State } from '../../models/interfaces/state'
import AddMovement from '../../components/dialog/AddMovement/AddMovement'
import { NewMovementDto } from '../../models/interfaces/movement'
import { addMovement, getMovements } from '../../store/actionsFactory'

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
			<Typography>Hola {userLogged?.displayName}</Typography>

			{movements?.map(movement => (
				<div key={movement.id}>
					{movement.money} - {movement.type}
				</div>
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
