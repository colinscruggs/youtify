import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  const codeRef = useRef(code);
  const theme = createTheme({
    palette: {
      type: 'dark',
      background: {
        default: "#303030",
        paper: "#424242"
      },
      primary: {
        main: '#2E7D32',
        dark: '#358e3a',
      },
      secondary: {
        main: '#FFE082',
      },
      success: {
        main: '#33691E',
        dark: '#4b9a2e',
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
            codeRef.current ? 
            <Dashboard code={codeRef.current} /> : <Login />
          }
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
