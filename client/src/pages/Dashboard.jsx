import React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import '../styles/Dashboard.css';

import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import ToolBar from '../components/ToolBar';
import ArtistInfoModal from '../components/ArtistInfoModal';
import TopArtists from '../components/TopArtists';
import UserListeningMetrics from '../components/UserListeningMetrics';

const spotifyApi = new SpotifyWebApi({
	clientId: '16b80bb6a6604b0392a49028ddce5b60',
});

export default function Dashboard({ code }) {
	const [loading, setLoading] = useState(false);
	const [loadingMetrics, setLoadingMetrics] = useState(false);
	const [userProfile, setUserProfile] = useState(null);
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedTimeRange, setSelectedTimeRange] = useState('short_term'); // TODO: add different time range selection
	const [selectedArtist, setSelectedArtist] = useState(null);
	const [userListeningMetrics, setUserListeningMetrics] = useState(null);
	const accessToken = useAuth(code);

	const NUM_ITEMS_ARTISTS = 12;
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
	}, [accessToken, selectedTimeRange]);

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

	const generateListeningMetrics = async () => {
		try {
			setLoadingMetrics(true);
			const trackIds = topTracks.map((track) => track.id);
			await spotifyApi.getAudioFeaturesForTracks(trackIds).then((res) => {
				console.log(res.body.audio_features);
				setUserListeningMetrics(res.body.audio_features);
			});
		} catch (e) {
			console.error(e);
		} finally {
			setTimeout(() => {
				setLoadingMetrics(false);
			}, '3000');
		}
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
				<UserListeningMetrics
					userProfile={userProfile}
					generateMetrics={generateListeningMetrics}
					userListeningMetrics={userListeningMetrics}
					loading={loadingMetrics}
				/>
				<TopArtists
					topArtists={topArtists}
					setSelectedArtist={setSelectedArtist}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					loading={loading}
				/>
			</Grid>

			<ArtistInfoModal
				artist={selectedArtist}
				open={!!selectedArtist}
				handleClose={handleCloseSelectedArtist}
			/>
		</>
	);
}
