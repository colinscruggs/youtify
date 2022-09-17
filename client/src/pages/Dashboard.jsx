import React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
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
	const [playlists, setPlaylists] = useState();
	const [topTracks, setTopTracks] = useState();

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedTimeRange, setSelectedTimeRange] = useState('short_term'); // TODO: add different time range selection
	const [selectedArtist, setSelectedArtist] = useState(null);
	const accessToken = useAuth(code);

	const NUM_ITEMS = 20;

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
				await spotifyApi.getUserPlaylists().then((res) => {
					setPlaylists(res.body);
				});
				await spotifyApi.getMyTopTracks().then((res) => {
					setTopTracks(res.body);
				});
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
						limit: NUM_ITEMS,
						offset: (currentPage - 1) * NUM_ITEMS,
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
				p={2}
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			>
				{/* TOP ARTISTS */}
				<Grid item sm={12} md={12} lg={6} xl={6}>
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
						<Typography
							variant="h5"
							component="div"
							sx={{ flexGrow: 1, alignSelf: 'start' }}
						>
							Welcome,{' '}
							{userProfile ? userProfile.display_name : ''}
						</Typography>
						<Divider sx={{ width: '100%', margin: '1rem' }}>
							<Chip label="Top Artists" />
						</Divider>
						<Grid
							container
							direction="row"
							alignItems="center"
							rowSpacing={2}
							columnSpacing={2}
						>
							{(loading
								? Array.from(new Array(NUM_ITEMS))
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
							count={Math.ceil(topArtists?.total / NUM_ITEMS)}
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
