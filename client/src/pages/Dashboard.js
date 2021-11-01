import React from 'react'
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import '../styles/Dashboard.css'

import useAuth from '../hooks/useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: '16b80bb6a6604b0392a49028ddce5b60'
})

export default function Dashboard({ code }) {
  const [loading, setLoading] = useState(false);
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
  useEffect(async () => {
    if (!accessToken) return

    setLoading(true);

    await spotifyApi.getMe().then((res) => {
      setUserProfile(res.body);
    });
    await spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(res.body);
    });
    await spotifyApi.getMyTopArtists().then((res) => {
      setTopArtists(res.body);
    });
    await spotifyApi.getMyTopTracks().then((res) => {
      setTopTracks(res.body);
    });
    setLoading(false);
    
  }, [accessToken]);

  console.log(userProfile);
  console.log(topArtists);

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingLeft: '1em' }}>
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
    <LinearProgress 
      variant={!loading ? 'determinate' : 'indeterminate'}
      value={100}
    />
    <Grid 
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      style={{ minHeight: 'calc(100vh - 68px)', maxWidth: '100%' }}
    >
      <Grid item xs={11} sm={11} md={6}>
        <Paper
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {userProfile ? userProfile.display_name : ''}
          </Typography>
          <Divider sx={{
            margin: '1rem 1rem 2rem 1rem'
          }}>
            <Chip label="Top Artists" />
          </Divider>
          <Grid
            container
            direction="row"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={2}
          >
            { topArtists ? topArtists.items.map(artist => {
              const name = artist.name;
              return (
                <Grid item xs={4} sm={3} md={4} lg={3} xl={2}

                >
                  <div className='artist-container'>
                    <Avatar alt={name} src={artist.images[0].url} variant="rounded" />
                    <Typography variant="overlineText" alignSelf='center'>
                      {name}
                    </Typography>
                  </div>
                </Grid>
              );
            }) : null}
            <Grid item>

            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}>
            <Typography variant="overlineText" alignSelf='center'>
              Please select an artist to continue 
            </Typography>
        </Paper>
      </Grid>
    </Grid>
    </>
  )

}
