import { ComponentType, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { Dispatch } from 'redux'

interface Props {
	path: string
	component: ComponentType
	redirect: string
	guard?: (dispatch: Dispatch) => Promise<boolean>
}

const GuardedRoute: FC<Props> = ({ path, component, redirect, guard }) => {
	const dispatch = useDispatch()
	const [loaded, setLoaded] = useState(true)
	const [haveAccess, setHaveAccess] = useState(false)

	const { pathname } = window.location
	const matchResult = pathname === path

	useEffect(() => {
		async function checkGuards() {
			setLoaded(true)
			const canBeRendered = guard ? await guard(dispatch) : true
			setHaveAccess(canBeRendered)
			setLoaded(false)
		}

		checkGuards()
	}, [path])

	if (matchResult) {
		if (loaded) {
			return null
		}

		if (guard && !haveAccess) {
			return <Redirect to={redirect} />
		}
	}

	return <Route path={path} component={component} />
}

export default GuardedRoute
