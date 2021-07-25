import { FC } from 'react'
import { Router, Switch, Redirect } from 'react-router-dom'

import * as Routes from '../../../models/constants/routes'

import Home from '../../../views/Home/Home'
import Login from '../../../views/Login/Login'
import Register from '../../../views/Register/Register'

import history from '../../../utils/history'
import GuardedRoute from '../GuardedRoute/GuardedRoute'
import { isLogged, isNotLogged } from '../../../services/guards'

const Routing: FC = () => {
	return (
		<Router history={history}>
			<Switch>
				<Redirect path={Routes.ROOT} to={Routes.HOME} exact />
				<GuardedRoute
					path={Routes.LOGIN}
					component={Login}
					redirect={Routes.ROOT}
					guard={isNotLogged}
				/>
				<GuardedRoute
					path={Routes.REGISTER}
					component={Register}
					redirect={Routes.ROOT}
					guard={isNotLogged}
				/>
				<GuardedRoute
					path={Routes.HOME}
					component={Home}
					redirect={Routes.LOGIN}
					guard={isLogged}
				/>
			</Switch>
		</Router>
	)
}

export default Routing
