import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const client_id = '16b80bb6a6604b0392a49028ddce5b60';
const redirect_uri = 'http://localhost:3000';
const scope = 'user-read-private%20user-read-email%20user-read-recently-played%20user-top-read%20playlist-read-private'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;


export default function Login() {
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            To access Youtify, please login to Spotify
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" color="success" href={AUTH_URL}>LOGIN</Button>
        </CardActions>
      </Card>
    </div>
  );
}
