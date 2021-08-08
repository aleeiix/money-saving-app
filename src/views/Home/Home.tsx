import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Fab, Card, CardContent, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'

import { State } from '../../models/interfaces/state'
import AddMovement from '../../components/dialog/AddMovement/AddMovement'
import { NewMovementDto } from '../../models/interfaces/movement'
import * as ActionsFactory from '../../store/actionsFactory'
import CardMovement from '../../components/movements/CardMovement/CardMovement'
import PersonIcon from '@material-ui/icons/Person'
import ResumeMovements from '../../components/movements/ResumeMovements/ResumeMovements'
import * as MovementService from '../../services/movementService'

const HomeStyled = styled.div`
	/* position: relative; */
`

const FabStyled = styled(Fab)`
	position: fixed;
	bottom: 3.8rem;
	right: 0.8rem;
`

const Home: FC = () => {
	const dispatch = useDispatch()
	const listMovementsRef = useRef<HTMLDivElement>(null)

	const { userLogged, movements } = useSelector(
		({ userLogged, movementsMonth }: State) => ({
			userLogged,
			movements: movementsMonth,
		})
	)

	const [open, setOpen] = useState(false)

	useEffect(() => {
		getMovements()
	}, [userLogged])

	const getMovements = async () => {
		try {
			if (userLogged?.uid) {
				const movements = await MovementService.getMovementsMonth(userLogged?.uid)
				dispatch(ActionsFactory.getMovementsMonth(movements))
			}
		} catch (error) {
			console.log('🚀 ~ file: Home.tsx ~ line 45 ~ getMovements ~ error', error)
		}
	}

	const handleOpenAddMovement = () => {
		setOpen(true)
	}

	const handleCloseAddMovement = () => {
		setOpen(false)
	}

	const handleSubmitAddMovement = async (movement: NewMovementDto) => {
		try {
			if (userLogged?.uid) {
				const newMovement = await MovementService.addMovement(
					movement,
					userLogged.uid
				)

				dispatch(ActionsFactory.addMovement(newMovement))

				handleCloseAddMovement()
			}
		} catch (error) {
			console.log(
				'🚀 ~ file: Home.tsx ~ line 71 ~ handleSubmitAddMovement ~ error',
				error
			)
		}
	}

	return (
		<HomeStyled>
			<Box display='flex' justifyContent='center' mb={4}>
				<Card>
					<Box component={CardContent} display='flex' alignItems='center'>
						<Box component={PersonIcon} mr={1} style={{ fontSize: 30 }} />
						<Typography variant='h5'>
							Hola <strong>{userLogged?.displayName}</strong>
						</Typography>
					</Box>
				</Card>
			</Box>

			<Box mb={4}>
				<Box mb={1}>
					<Typography variant='h6'>Resumen del mes</Typography>
				</Box>
				<ResumeMovements movements={movements} />
			</Box>

			<div
				ref={listMovementsRef}
				style={{
					height: `calc(100% - ${listMovementsRef?.current?.offsetTop || 0}px)`,
				}}
			>
				<Box pb={1}>
					<Typography variant='h6'>Movimientos del mes</Typography>
				</Box>
				<div>
					{movements?.length ? (
						movements?.map(movement => (
							<CardMovement key={movement.id} movement={movement} />
						))
					) : (
						<Typography align='center'>Aun no tienes movimientos</Typography>
					)}
				</div>
			</div>

			<FabStyled color='primary' onClick={handleOpenAddMovement}>
				<AddIcon></AddIcon>
			</FabStyled>

			<AddMovement
				open={open}
				handleClose={handleCloseAddMovement}
				handleSubmit={handleSubmitAddMovement}
			></AddMovement>
		</HomeStyled>
	)
}

export default Home
