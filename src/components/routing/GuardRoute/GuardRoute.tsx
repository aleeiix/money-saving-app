import { ComponentType, FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
	path: string
	layout?: ComponentType
	component: ComponentType
	redirect: string
	guard?: () => boolean
	exact?: boolean
}

const GuardRoute: FC<Props> = ({
	path,
	layout: Layout,
	component: Component,
	redirect,
	guard,
	exact,
}) => {
	const RouteTemplate = (
		<Route
			path={path}
			render={() =>
				Layout ? (
					<Layout>
						<Component />
					</Layout>
				) : (
					<Component />
				)
			}
			exact={exact}
		/>
	)

	if (guard) {
		return guard() ? RouteTemplate : <Redirect to={redirect} />
	} else {
		return RouteTemplate
	}
}

export default GuardRoute
