import { FC } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as Routes from '../../../models/constants/routes'

import Home from '../../../views/Home/Home'
import Login from '../../../views/Login/Login'
import Register from '../../../views/Register/Register'
import GuardRoute from '../GuardRoute/GuardRoute'
import LoggedLayout from '../../layout/LoggedLayout/LoggedLayout'
import { isLogged } from '../../../services/guards'
import { State } from '../../../models/interfaces/state'

const Routing: FC = () => {
	const userLogged = useSelector(({ userLogged }: State) => userLogged)

	return (
		<BrowserRouter>
			<Switch>
				<GuardRoute
					path={Routes.LOGIN}
					component={Login}
					redirect={Routes.ROOT}
					guard={() => !isLogged(userLogged)}
				/>
				<GuardRoute
					path={Routes.REGISTER}
					component={Register}
					redirect={Routes.ROOT}
					guard={() => !isLogged(userLogged)}
				/>
				<GuardRoute
					path={Routes.ROOT}
					layout={LoggedLayout}
					component={Home}
					redirect={Routes.LOGIN}
					guard={() => isLogged(userLogged)}
					exact={true}
				/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routing
