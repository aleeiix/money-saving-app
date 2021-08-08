import {
	Box,
	Card,
	CardContent,
	Typography,
	Paper,
	Chip,
} from '@material-ui/core'
import { FC } from 'react'
import styled from 'styled-components'
import {
	MovementDto,
	MovementTypeEnum,
} from '../../../models/interfaces/movement'
import EuroIcon from '@material-ui/icons/Euro'
import ReceiptIcon from '@material-ui/icons/Receipt'

interface Props {
	movement: MovementDto
}

const CardContentStyled = styled(CardContent)<{ income: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-left: 0.5rem solid;
	border-left-color: ${props =>
		props.income === 'true'
			? 'rgba(40, 167, 69, 0.8)'
			: 'rgba(220, 53, 69, 0.8)'};
`
const PaperStyled = styled(Paper)`
	display: flex;
	padding: 0.5rem;
	border-radius: 50%;
	margin-right: 1rem;
`

const CardMovement: FC<Props> = ({ movement }) => {
	return (
		<Box component={Card} mb={1} boxShadow={3}>
			<CardContentStyled
				income={String(movement.type === MovementTypeEnum.INCOME)}
			>
				<Box display='flex' alignItems='center'>
					<PaperStyled elevation={3}>
						{movement.type === MovementTypeEnum.INCOME ? (
							<EuroIcon />
						) : (
							<ReceiptIcon />
						)}
					</PaperStyled>

					<Box>
						<Typography>
							{movement.type === MovementTypeEnum.INCOME
								? `Has ganado ${movement.amount}€`
								: `Has gastado ${movement.amount}€`}
						</Typography>
						{movement.description && (
							<Typography variant='caption' color='textSecondary'>
								<b>Desc:</b> {movement.description}
							</Typography>
						)}
					</Box>
				</Box>

				<Chip
					variant='outlined'
					size='small'
					label={movement.subtype}
					color='primary'
				/>
			</CardContentStyled>
		</Box>
	)
}

export default CardMovement
