import { render } from 'react-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from './store/store'

import App from './App'
import reportWebVitals from './reportWebVitals'

import './services/firebase'

render(
	<Provider store={store}>
		<App />
		<CssBaseline />
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
