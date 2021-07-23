import { FC } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import * as Routes from '../../../models/constants/routes'

import Home from '../../../views/Home/Home'
import Login from '../../../views/Login/Login'
import Register from '../../../views/Register/Register'

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect path={Routes.ROOT} to={Routes.HOME} exact />
				<Route path={Routes.LOGIN} component={Login} />
				<Route path={Routes.REGISTER} component={Register} />
				<Route path={Routes.HOME} component={Home} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
