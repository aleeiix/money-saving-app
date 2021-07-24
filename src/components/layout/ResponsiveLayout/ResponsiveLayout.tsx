import { Box, Card, CardContent } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

const maxWidth = 500

const CardStyled = styled(Card)`
	width: ${maxWidth}px;
`

const ResponsiveLayout: FC = ({ children }) => {
	const [width, setWidth] = useState<number>(window.outerWidth)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleResize = (event: any) => {
		setWidth(event.currentTarget.outerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<Box component='main' m={2}>
			{width <= maxWidth ? (
				children
			) : (
				<Box display='flex' justifyContent='center'>
					<CardStyled>
						<CardContent>{children}</CardContent>
					</CardStyled>
				</Box>
			)}
		</Box>
	)
}

export default ResponsiveLayout
