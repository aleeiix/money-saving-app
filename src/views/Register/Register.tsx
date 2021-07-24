import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Typography, Box, Button, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.css'

import * as ActionsFactory from './../../store/actionsFactory'
import * as Routes from './../../models/constants/routes'
import { RegisterDto } from '../../models/interfaces/auth'

const SeparatorStyled = styled.span`
	display: flex;
	flex: 1;
	height: 1px;
	margin: 0 0.5rem 0 0.5rem;
	background: rgba(0, 0, 0, 0.87);
`

const Register: FC = () => {
	const dispatch = useDispatch()

	const [register, setRegister] = useState<RegisterDto>({
		displayName: '',
		email: '',
		password: '',
		repeatPassword: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e

		setRegister({
			...register,
			[name]: value,
		})
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (register.password === register.repeatPassword) {
			dispatch(ActionsFactory.register(register))
		} else {
			alert('Las contraseñas no coinciden')
		}
	}

	const handleClickGoogle = () => {
		dispatch(ActionsFactory.signInWithGoogle())
	}

	return (
		<>
			<Typography variant='h4' component='h1' align='center'>
				Bienvenid@
			</Typography>

			<Box component='form' mt={4} onSubmit={handleSubmit}>
				<Box mb={2}>
					<TextField
						label='Nombre'
						name='displayName'
						value={register.displayName}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
				</Box>
				<Box mb={2}>
					<TextField
						label='Correo electronico'
						name='email'
						value={register.email}
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
						value={register.password}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
				</Box>
				<Box mb={2}>
					<TextField
						label='Repita la contraseña'
						name='repeatPassword'
						type='password'
						value={register.repeatPassword}
						onChange={handleChange}
						variant='outlined'
						fullWidth
					/>
				</Box>
				<Button type='submit' variant='contained' color='primary' fullWidth>
					Registrar
				</Button>
			</Box>

			<Box display='flex' flexDirection='column' mt={5}>
				<Box display='flex' alignItems='center' mb={2}>
					<SeparatorStyled />
					<Typography component='p' align='center'>
						Puedes registrarte con
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
					Ya estas registrado? <Link to={Routes.LOGIN}>Inicia sesión aqui</Link>
				</Typography>
			</Box>
		</>
	)
}

export default Register
