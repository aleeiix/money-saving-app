import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Router from './components/routing/Router/Router'

function App(): React.ReactElement {
	return (
		<>
			<CssBaseline />
			<Router />
		</>
	)
}

export default App
