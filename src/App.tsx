import * as React from 'react'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import Routing from './components/routing/Routing/Routing'
import ResponsiveLayout from './components/layout/ResponsiveLayout/ResponsiveLayout'

import store from './store/store'

import './services/firebase'

function App(): React.ReactElement {
	return (
		<>
			<Provider store={store}>
				<ResponsiveLayout>
					<Routing />
				</ResponsiveLayout>
				<CssBaseline />
			</Provider>
		</>
	)
}

export default App
