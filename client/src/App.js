import Login from './Login';
import Dashboard from './Dashboard';
import Grid from '@mui/material/Grid';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <Grid 
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {code ? 
        <Dashboard code={code} /> : <Login />
      }
    </Grid>
  );
}

export default App;
