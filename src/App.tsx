import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Router from './components/routing/Router/Router'
import ResponsiveLayout from './components/layout/ResponsiveLayout/ResponsiveLayout'

function App(): React.ReactElement {
	return (
		<>
			<ResponsiveLayout>
				<Router />
			</ResponsiveLayout>
			<CssBaseline />
		</>
	)
}

export default App
