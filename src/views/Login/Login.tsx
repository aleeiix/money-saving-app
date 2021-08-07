import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Typography, Box, Button, Icon } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.css'

import * as ActionsFactory from './../../store/actionsFactory'
import * as AuthService from './../../services/authService'
import * as Routes from './../../models/constants/routes'
import { LoginDto } from '../../models/interfaces/auth'

const SeparatorStyled = styled.span`
	display: flex;
	flex: 1;
	height: 1px;
	margin: 0 0.5rem 0 0.5rem;
	background: rgba(0, 0, 0, 0.87);
`

const Login: FC = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const [login, setLogin] = useState<LoginDto>({ email: '', password: '' })

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e

		setLogin({
			...login,
			[name]: value,
		})
	}

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault()
			const userLogged = await AuthService.login(login)

			if (userLogged) {
				dispatch(ActionsFactory.login(userLogged))
				history.replace(Routes.ROOT)
			}
		} catch (error) {
			console.log(
				'🚀 ~ file: Login.tsx ~ line 49 ~ handleClickGoogle ~ error',
				error
			)
		}
	}

	const handleClickGoogle = async () => {
		try {
			const userLogged = await AuthService.signInWithGoogle()

			if (userLogged) {
				dispatch(ActionsFactory.login(userLogged))
				history.replace(Routes.ROOT)
			}
		} catch (error) {
			console.log(
				'🚀 ~ file: Login.tsx ~ line 49 ~ handleClickGoogle ~ error',
				error
			)
		}
	}

	return (
		<>
			<Typography variant='h4' component='h1' align='center'>
				Bienvenid@ de nuevo
			</Typography>

			<Box component='form' mt={4} onSubmit={handleSubmit}>
				<Box mb={2}>
					<TextField
						label='Correo electronico'
						name='email'
						value={login.email}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
				</Box>
				<Box mb={2}>
					<TextField
						label='Contraseña'
						name='password'
						type='password'
						value={login.password}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
				</Box>
				<Button type='submit' variant='contained' color='primary' fullWidth>
					Iniciar sesión
				</Button>
			</Box>

			<Box display='flex' flexDirection='column' mt={5}>
				<Box display='flex' alignItems='center' mb={2}>
					<SeparatorStyled />
					<Typography component='p' align='center'>
						Puedes entra con
					</Typography>
					<SeparatorStyled />
				</Box>

				<Button
					variant='contained'
					style={{ backgroundColor: '#db4537', color: 'white' }}
					startIcon={<Icon className='fa fa-google' />}
					onClick={handleClickGoogle}
				>
					Google
				</Button>
			</Box>

			<Box mt={5}>
				<Typography component='p' align='center'>
					No estas registado? <Link to={Routes.REGISTER}>Registrate aqui</Link>
				</Typography>
			</Box>
		</>
	)
}

export default Login
