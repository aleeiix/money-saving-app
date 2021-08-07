import { FC, useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import styled from 'styled-components'

import { BottomNavigationEnum } from '../../../models/interfaces/navigation'
import * as Routes from '../../../models/constants/routes'
import * as AuthService from '../../../services/authService'
import * as ActionsFactory from '../../../store/actionsFactory'

const LoggedLayoutContainer = styled.div`
	height: 100%;
	padding-bottom: 42px;
`

const BottomNavigationStyled = styled(BottomNavigation)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`

const LoggedLayout: FC = ({ children }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [navigation, setNavigation] = useState<BottomNavigationEnum>(
		BottomNavigationEnum.HOME
	)

	const handleChange = async (
		// eslint-disable-next-line @typescript-eslint/ban-types
		_event: ChangeEvent<{}>,
		newValue: BottomNavigationEnum
	) => {
		try {
			if (newValue === BottomNavigationEnum.EXIT) {
				await AuthService.logout()
				dispatch(ActionsFactory.logout())
				history.replace(Routes.LOGIN)
			} else {
				setNavigation(newValue)
			}
		} catch (error) {
			console.log('🚀 ~ file: LoggedLayout.tsx ~ line 42 ~ error', error)
		}
	}

	return (
		<LoggedLayoutContainer>
			{children}
			<BottomNavigationStyled
				value={navigation}
				onChange={handleChange}
				showLabels
			>
				<BottomNavigationAction
					label='Inicio'
					value={BottomNavigationEnum.HOME}
					icon={<HomeRoundedIcon />}
				/>
				<BottomNavigationAction
					label='Salir'
					value={BottomNavigationEnum.EXIT}
					icon={<ExitToAppRoundedIcon />}
				/>
			</BottomNavigationStyled>
		</LoggedLayoutContainer>
	)
}

export default LoggedLayout
