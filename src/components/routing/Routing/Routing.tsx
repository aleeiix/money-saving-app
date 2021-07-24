import { FC } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import * as Routes from '../../../models/constants/routes'

import Home from '../../../views/Home/Home'
import Login from '../../../views/Login/Login'
import Register from '../../../views/Register/Register'

import history from '../../../utils/history'

const Routing: FC = () => {
	return (
		<Router history={history}>
			<Switch>
				<Redirect path={Routes.ROOT} to={Routes.HOME} exact />
				<Route path={Routes.LOGIN} component={Login} />
				<Route path={Routes.REGISTER} component={Register} />
				<Route path={Routes.HOME} component={Home} />
			</Switch>
		</Router>
	)
}

export default Routing
