import React from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const client_id = '16b80bb6a6604b0392a49028ddce5b60';
const redirect_uri = 'http://localhost:3000/home';
const scope = 'user-read-private%20user-read-email%20user-read-recently-played%20user-top-read%20playlist-read-private'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;


export default function Login() {
  return (
    <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', maxWidth: '100%' }}
    >
      <Grid item xs={12}>
        <Card sx={{ 
          maxWidth: 400,
          // bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }}  gutterBottom>
              To access Youtify, please login to Spotify
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" color="success" href={AUTH_URL}>LOGIN</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
