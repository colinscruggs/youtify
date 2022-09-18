import React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import '../styles/Dashboard.css';

import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import ToolBar from '../components/ToolBar';
import ArtistInfoModal from '../components/ArtistInfoModal';

const spotifyApi = new SpotifyWebApi({
	clientId: '16b80bb6a6604b0392a49028ddce5b60',
});

export default function Dashboard({ code }) {
	const [loading, setLoading] = useState(false);
	const [userProfile, setUserProfile] = useState();
	const [topArtists, setTopArtists] = useState();
	const [topTracks, setTopTracks] = useState();

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedTimeRange, setSelectedTimeRange] = useState('short_term'); // TODO: add different time range selection
	const [selectedArtist, setSelectedArtist] = useState(null);
	const accessToken = useAuth(code);

	const NUM_ITEMS_ARTISTS = 20;
	const NUM_ITEMS_TRACKS = 50;

	// SET ACCESS TOKEN ON SPOTIFY API INSTANCE
	useEffect(() => {
		if (!accessToken) return;

		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	// FETCH USER DATA
	useEffect(() => {
		if (!accessToken) return;

		const fetchUserData = async () => {
			try {
				setLoading(true);
				await spotifyApi.getMe().then((res) => {
					setUserProfile(res.body);
				});
				const topTracks = [];
				const resultTopFifty = await spotifyApi.getMyTopTracks({
					limit: NUM_ITEMS_TRACKS,
					offset: 0, // 0-49
					time_range: selectedTimeRange,
				});
				resultTopFifty.body.items.forEach((track) => {
					topTracks.push(track);
				});
				const resultSecondFifty = await spotifyApi.getMyTopTracks({
					limit: NUM_ITEMS_TRACKS,
					offset: 1, // 50-99
					time_range: selectedTimeRange,
				});
				resultSecondFifty.body.items.forEach((track) => {
					topTracks.push(track);
				});
				setTopTracks(topTracks);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [accessToken]);

	// FETCH TOP ARTISTS BY PAGE NUMBER
	useEffect(() => {
		if (!accessToken) return;

		const fetchTopArtists = async () => {
			try {
				setLoading(true);
				await spotifyApi
					.getMyTopArtists({
						limit: NUM_ITEMS_ARTISTS,
						offset: (currentPage - 1) * NUM_ITEMS_ARTISTS,
						time_range: selectedTimeRange,
					})
					.then((res) => {
						setTopArtists(res.body);
					});
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};

		fetchTopArtists();
	}, [currentPage, selectedTimeRange, accessToken]);

	const handleCloseSelectedArtist = () => {
		setSelectedArtist(null);
	};

	return (
		<>
			<ToolBar userProfile={userProfile} code={!!code} />
			<LinearProgress
				variant={!loading ? 'determinate' : 'indeterminate'}
				value={100}
			/>
			<Grid
				container
				direction="row"
				justifyContent="space-around"
				alignItems="center"
				p={6}
				rowSpacing={4}
				columnSpacing={{ xs: 6, sm: 6, md: 3 }}
			>
				<Grid item sm={12} md={12} lg={7} xl={7}>
					<Paper
						sx={{
							bgcolor: 'background.paper',
							color: 'text.primary',
							borderRadius: 1,
							p: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
						}}
					>
						<Typography
							variant="h4"
							component="div"
							sx={{
								flexGrow: 1,
								alignSelf: 'start',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							Welcome,{' '}
							{userProfile ? userProfile.display_name : ''}
							<AudiotrackIcon
								sx={{ ml: 0.8, mt: 0.8, fontSize: 35 }}
								color="secondary"
							/>
						</Typography>
						<Divider
							sx={{ width: '100%', margin: '1rem' }}
						></Divider>
						<Typography variant="h5" sx={{ mt: 1, width: '100%' }}>
							Youtify is a tool to find insight on your recent
							listening habits.
						</Typography>
						<Typography variant="h6" sx={{ mt: 4 }}>
							Generate fun metrics based on your top artists and
							tracks and see how what your music taste says about
							you!
						</Typography>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Button
								variant="contained"
								endIcon={<AutoGraphIcon />}
								color="error"
								sx={{
									width: '50%',
									minHeight: '5rem',
									mt: 4,
									borderRadius: '10rem',
									fontSize: '1.125rem',
								}}
							>
								Generate Now
							</Button>
						</Box>
					</Paper>
				</Grid>
				{/* TOP ARTISTS */}
				<Grid item sm={12} md={12} lg={5} xl={5}>
					<Paper
						sx={{
							bgcolor: 'background.paper',
							color: 'text.primary',
							borderRadius: 1,
							p: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Divider sx={{ width: '100%', margin: '1rem' }}>
							<Chip label="Recent Top Artists" />
						</Divider>
						<Grid
							container
							direction="row"
							alignItems="center"
							rowSpacing={2}
							columnSpacing={2}
						>
							{(loading
								? Array.from(new Array(NUM_ITEMS_ARTISTS))
								: topArtists?.items ?? []
							).map((artist) => {
								return artist ? (
									<Grid
										item
										xs={4}
										sm={3}
										md={2}
										lg={2}
										xl={3}
									>
										<div
											className="artist-container"
											onClick={() => {
												setSelectedArtist(artist);
											}}
										>
											<Avatar
												alt={artist.name}
												src={artist?.images[1]?.url}
												variant="rounded"
												sx={{ width: 56, height: 56 }}
											/>
											<Typography
												variant="overlineText"
												sx={{
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													maxWidth: '100%',
												}}
											>
												{artist?.name}
											</Typography>
										</div>
									</Grid>
								) : (
									<Grid
										item
										xs={6}
										sm={3}
										md={3}
										lg={3}
										xl={2}
									>
										<div className="artist-container">
											<Skeleton
												variant="rectangular"
												animation="wave"
												width={56}
												height={56}
												style={{ marginBottom: 6 }}
											/>
											<Skeleton
												variant="text"
												animation="wave"
												width={56}
												height={16}
											/>
										</div>
									</Grid>
								);
							})}
						</Grid>
						<Pagination
							sx={{
								alignSelf: 'center',
								marginTop: '1rem',
							}}
							count={Math.ceil(
								topArtists?.total / NUM_ITEMS_ARTISTS
							)}
							page={currentPage}
							onChange={(_, page) => {
								setCurrentPage(page);
							}}
							shape="rounded"
						/>
					</Paper>
				</Grid>
			</Grid>

			<ArtistInfoModal
				artist={selectedArtist}
				open={!!selectedArtist}
				handleClose={handleCloseSelectedArtist}
			/>
		</>
	);
}
