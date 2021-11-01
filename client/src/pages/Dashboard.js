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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
  const [currentArtist, setCurrentArtist] = useState(null);
  const accessToken = useAuth(code);

  const NUM_ITEMS = 20;

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
    await spotifyApi.getMyTopArtists({ limit: NUM_ITEMS, offset: currentPage, time_range: selectedTimeRange }).then((res) => {
      setTopArtists(res.body);
    });
    await spotifyApi.getMyTopTracks().then((res) => {
      setTopTracks(res.body);
    });

    setLoading(false);
  }, [accessToken]);

  useEffect(async () => {
    if (!accessToken) return
    setLoading(true);

    await spotifyApi.getMyTopArtists({ limit: NUM_ITEMS, offset: (currentPage - 1) * NUM_ITEMS, time_range: selectedTimeRange }).then((res) => {
      setTopArtists(res.body);
    });

    setLoading(false);
  }, [currentPage])

  console.log(currentArtist);

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
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {/* TOP ARTISTS/SONGS */}
      <Grid item xs={11} sm={11} md={currentArtist ? 5 : 6}>
        <Paper
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1, alignSelf: 'start'}}>
            Welcome, {userProfile ? userProfile.display_name : ''}
          </Typography>
          <Divider sx={{width:'100%', margin: '1rem'}}>
            <Chip label="Top Artists" />
          </Divider>
          <Grid
            container
            direction="row"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={4}
          >
            { (loading ? Array.from(new Array(NUM_ITEMS)) : topArtists?.items ?? []).map(artist => {
              return  artist ? (
                <Grid item xs={6} sm={3} md={currentArtist ? 4 : 3} lg={currentArtist ? 4 : 3} xl={currentArtist ? 3 : 2}>
                  <div className='artist-container'
                    onClick={() => {
                      setCurrentArtist(artist);
                    }}
                  >
                    <Avatar alt={artist.name} src={artist?.images[1]?.url} variant="rounded" sx={{ width: 56, height: 56 }}/>
                    <Typography variant="overlineText" sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}>
                      {artist?.name}
                    </Typography>
                  </div>
                </Grid>
              ) : (
              <Grid item xs={6} sm={3} md={3} lg={3} xl={2}>
                <div className='artist-container' >
                  <Skeleton variant="rectangular" animation="wave" width={56} height={56} style={{ marginBottom: 6 }}/>
                  <Skeleton variant="text" animation="wave" width={56} height={16} variant="body"/>
                </div>
              </Grid>
              )
            })}
          </Grid>
          <Pagination 
            sx={{
              alignSelf: 'center',
              marginTop: '1rem'
            }}
            count={Math.ceil(topArtists?.total / NUM_ITEMS)} 
            page={currentPage}
            onChange={(_, page) => {
              setCurrentPage(page);
            }}
            shape="rounded" />
        </Paper>
      </Grid>
      {/* SELECTED ARTIST/SONG DETAILS */}
      <Grid item item xs={11} sm={11} md={currentArtist ? 7 : 4}>
          <Paper
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderRadius: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
          }}>
              <Typography variant="overlineText" alignSelf='start'>
                { !currentArtist ? 'Please select an artist to continue 🙂' :
                  (
                    <div className='current-artist-container'>
                      <Typography variant="h5" component="div" sx={{ flexGrow: 1, alignSelf: 'start'}}>
                        <a href={currentArtist.external_urls.spotify} target="_blank" rel="noopener">{currentArtist.name}</a>
                      </Typography>
                      <Avatar 
                        alt={currentArtist.name}
                        src={currentArtist.images[0].url}
                        sx={{ width: '66%', height: '66%', padding: '1em 0' }}
                        variant='square'
                      />
                    <div className='current-artist-stats'>
                      <Divider textAlign="left" sx={{width:'100%', margin: '1rem 0'}}>
                        <Chip label="Stats" />
                      </Divider>
                      <Typography variant="h6" component="h6">
                        {'Followers: ' + currentArtist.followers.total}
                      </Typography>
                      <div className='current-artist-genres' style={{ display: 'flex', paddingTop: '.4rem'}}>
                        <Typography variant="h6" component="h6">
                          Genres: 
                        </Typography>
                        <Grid container spacing={2}>
                          { currentArtist.genres.length > 0 ?
                            currentArtist.genres.map(genre => 
                              <Grid item sx={{ marginLeft: '.25rem'}}>
                              <Chip label={genre} variant="outlined" style={{ padding: '0 0 4px 0'}} />
                              </Grid>
                            )
                          : 
                          <Grid item sx={{ marginLeft: '.25rem'}}>
                            <Chip label={'N/A'} variant="outlined" style={{ padding: '0 0 4px 0'}} />
                          </Grid>
                          }
                        </Grid>
                      </div>
                      <div className='current-artist-popularity' style={{ display: 'flex', paddingTop: '.4rem'}}>
                        <Typography variant="h6" component="h6" sx={{ marginRight: '1rem'}}>
                          Popularity:  
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={currentArtist.popularity} />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="caption" component="div" color="text.secondary">
                            {`${Math.round(currentArtist.popularity)}%`}
                          </Typography>
                        </Box>
                      </Box>
                      </div>
                    </div>
                    </div>
                  )
                }
              </Typography>
          </Paper>
        </Grid>
    </Grid>
    </>
  )

}
