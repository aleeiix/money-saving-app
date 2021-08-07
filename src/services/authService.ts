import firebase from 'firebase/app'
import { auth, firestore } from './firebase'
import { LoginDto, RegisterDto, UserDto } from '../models/interfaces/auth'

import * as Collections from '../models/constants/collections'

export const getUserById = async (userId: string): Promise<UserDto> => {
	const userDoc = await firestore.collection(Collections.USERS).doc(userId).get()

	const { displayName, email, firstStepsCompleted } = userDoc.data() as UserDto

	return {
		uid: userDoc.id,
		displayName,
		email,
		firstStepsCompleted,
	}
}

export const login = async (user: LoginDto): Promise<UserDto | undefined> => {
	const userLogged = await auth.signInWithEmailAndPassword(
		user.email,
		user.password
	)

	if (userLogged?.user?.uid) {
		return getUserById(userLogged.user.uid)
	}
}

export const register = async (
	newUser: RegisterDto
): Promise<UserDto | undefined> => {
	const userLogged = await auth.createUserWithEmailAndPassword(
		newUser.email,
		newUser.password
	)

	if (userLogged?.user?.uid) {
		await firestore.collection(Collections.USERS).doc(userLogged.user.uid).set({
			displayName: newUser.displayName,
			email: newUser.email,
			firstStepsCompleted: false,
		})

		return {
			uid: userLogged?.user?.uid,
			displayName: newUser.displayName,
			email: newUser.email,
			firstStepsCompleted: false,
		}
	}
}

export const signInWithGoogle = async (): Promise<UserDto | undefined> => {
	const provider = new firebase.auth.GoogleAuthProvider()
	const userLogged = await auth.signInWithPopup(provider)

	if (userLogged?.user?.uid) {
		const userDoc = firestore
			.collection(Collections.USERS)
			.doc(userLogged.user.uid)

		const userGet = await userDoc.get()

		if (userGet.exists) {
			const { displayName, email, firstStepsCompleted } = userGet.data() as UserDto

			return {
				uid: userGet.id,
				displayName,
				email,
				firstStepsCompleted,
			}
		}

		await userDoc.set({
			displayName: userLogged.user.displayName,
			email: userLogged.user.email,
			firstStepsCompleted: false,
		})

		return {
			uid: userLogged?.user?.uid,
			displayName: userLogged.user.displayName || 'Desconocido',
			email: userLogged.user.email || '',
			firstStepsCompleted: false,
		}
	}
}

export const userIsLogged = (): Promise<UserDto | undefined> => {
	return new Promise(resolve => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			if (user) {
				const userLogged = await getUserById(user.uid)
				resolve(userLogged)
			} else {
				resolve(undefined)
			}
			unsubscribe()
		})
	})
}

export const logout = async (): Promise<void> => {
	return auth.signOut()
}
