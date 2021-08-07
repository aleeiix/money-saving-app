import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Routing from './components/routing/Routing/Routing'
import ResponsiveLayout from './components/layout/ResponsiveLayout/ResponsiveLayout'

import * as ActionsFactory from './store/actionsFactory'
import * as AuthService from './services/authService'

function App(): ReactElement {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		userIsLogged()
	}, [])

	const userIsLogged = async () => {
		try {
			const userLogged = await AuthService.userIsLogged()

			if (userLogged) {
				dispatch(ActionsFactory.login(userLogged))
			}

			setIsLoaded(true)
		} catch (error) {}
	}

	return (
		<>
			{isLoaded && (
				<ResponsiveLayout>
					<Routing />
				</ResponsiveLayout>
			)}
		</>
	)
}

export default App
