import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { FC } from 'react'
import {
	MovementDto,
	MovementTypeEnum,
} from '../../../models/interfaces/movement'

interface Props {
	movement: MovementDto
}

const CardMovement: FC<Props> = ({ movement }) => {
	return (
		<Box component={Card} mb={0.5}>
			<CardContent>
				<Typography>
					{movement.money} -{' '}
					{movement.type === MovementTypeEnum.INCOME ? 'Ingreso' : 'Gasto'}
				</Typography>
			</CardContent>
		</Box>
	)
}

export default CardMovement
