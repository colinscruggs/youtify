import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
	const code = new URLSearchParams(window.location.search).get('code');
	const codeRef = useRef(code);
	const theme = createTheme({
		palette: {
			type: 'dark',
			background: {
				default: '#303030',
				paper: '#424242',
			},
			primary: {
				main: '#2E7D32',
				dark: '#358e3a',
			},
			secondary: {
				main: '#8DB38B',
			},
			success: {
				main: '#33691E',
				dark: '#4b9a2e',
			},
			text: {
				primary: '#ffffff',
				secondary: 'rgba(255,255,255,0.71)',
				disabled: 'rgba(255,255,255,0.51)',
				hint: 'rgba(255,255,255,0.51)',
			},
			error: {
				main: '#EF8354',
			},
		},
		typography: {
			fontFamily: 'Zen Kaku Gothic Antique',
			fontSize: 14,
			fontWeightLight: 400,
			fontWeightRegular: 500,
			fontWeightMedium: 500,
		},
	});

	return (
		<>
			<ThemeProvider theme={theme} mode={'dark'}>
				<CssBaseline />
				<div>
					{
						// current scuffed routing solution--tried react-router-dom and kept getting infinite redirects
						codeRef.current ? (
							<Dashboard code={codeRef.current} />
						) : (
							<Login />
						)
					}
				</div>
			</ThemeProvider>
		</>
	);
}

export default App;
