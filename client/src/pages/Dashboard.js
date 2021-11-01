import React from 'react'
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../styles/Dashboard.css'

import useAuth from '../hooks/useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: '16b80bb6a6604b0392a49028ddce5b60'
})

export default function Dashboard({ code }) {
  const [userProfile, setUserProfile] = useState();
  const [playlists, setPlaylists] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const accessToken = useAuth(code);

  // SET ACCESS TOKEN ON SPOTIFY API INSTANCE
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // FETCH USER DATA
  useEffect(() => {
    if (!accessToken) return

    spotifyApi.getMe().then((res) => {
      setUserProfile(res.body);
    });
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(res.body);
    });
    spotifyApi.getMyTopArtists().then((res) => {
      setTopArtists(res.body);
    });
    spotifyApi.getMyTopTracks().then((res) => {
      setTopTracks(res.body);
    });
  }, [accessToken]);

  console.log(userProfile);

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Youtify
        </Typography>
        {code && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleMenu}
              color="inherit"
            >
              <img className='prof-picture' src={userProfile?.images[0]?.url} />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
    <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: 'calc(100vh - 64px)', maxWidth: '100%' }}
    >
      <p>Hello</p>
    </Grid>
    </>
  )

}
