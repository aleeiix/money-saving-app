import { firestore } from './firebase'

import * as Collections from '../models/constants/collections'
import { MovementDto, NewMovementDto } from '../models/interfaces/movement'

export const addMovement = async (
	movement: NewMovementDto,
	userUid: string
): Promise<MovementDto> => {
	const newMovementDoc = await firestore
		.collection(Collections.MOVEMENTS)
		.doc(userUid)
		.collection(Collections.MOVEMENTS_IMPROVISED)
		.add({ ...movement, date: new Date() })

	const newMovement = await newMovementDoc.get()
	const { type, money, date } = newMovement.data() as MovementDto

	return {
		id: newMovement.id,
		type,
		money,
		date,
	}
}

export const getResumeMovements = async (
	userUid: string
): Promise<MovementDto[]> => {
	const today = new Date()
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

	const movementsDocs = await firestore
		.collection(Collections.MOVEMENTS)
		.doc(userUid)
		.collection(Collections.MOVEMENTS_IMPROVISED)
		.where('date', '>', firstDay)
		.where('date', '<', lastDay)
		.orderBy('date', 'desc')
		.get()

	return movementsDocs.docs.map(doc => {
		const { money, type, date } = doc.data() as MovementDto

		return {
			id: doc.id,
			money,
			type,
			date,
		}
	})
}
