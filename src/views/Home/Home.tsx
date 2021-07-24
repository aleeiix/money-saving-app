import { FC } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../models/interfaces/state'

const Home: FC = () => {
	const userLogged = useSelector((state: State) => state.userLogged)

	return (
		<div>
			<h1>Hola {userLogged?.displayName}</h1>

			<h5>Resumen del mes / Configuracion</h5>

			<h5>Repaso otros meses</h5>
		</div>
	)
}

export default Home
