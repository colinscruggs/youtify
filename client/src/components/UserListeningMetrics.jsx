import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import Loader from './Loader';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function UserListeningMetrics({
	userProfile,
	userListeningMetrics,
	generateMetrics,
	loading,
}) {
	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: 15,
		borderRadius: 8,
		[`&.${linearProgressClasses.colorPrimary}`]: {
			backgroundColor: 'white',
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 5,
			backgroundColor: '#8DB38B',
		},
	}));

	console.log(userListeningMetrics);

	return (
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
					width: '100%',
				}}
			>
				<AnimatePresence mode={'wait'}>
					{!userListeningMetrics && !loading ? ( // SHOW INTRO/GENERATE BUTTON
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key="intro"
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
								{userProfile
									? userProfile.display_name.split(' ')[0]
									: ''}
								<AudiotrackIcon
									sx={{ ml: 0.8, mt: 0.8, fontSize: 35 }}
									color="secondary"
								/>
							</Typography>
							<Divider
								sx={{ width: '100%', margin: '1rem' }}
							></Divider>
							<Typography
								variant="h5"
								sx={{ mt: 1, width: '100%' }}
							>
								Youtify is a tool to discover insights on your
								recent listening habits.
							</Typography>
							<Typography variant="h6" sx={{ mt: 4 }}>
								Generate metrics based on your recent top
								artists and tracks and see what your music taste
								says about you!
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
									color="secondary"
									sx={{
										width: '50%',
										minHeight: '5rem',
										mt: 4,
										borderRadius: '10rem',
										fontSize: '1.125rem',
									}}
									onClick={generateMetrics}
								>
									<strong>Generate Now</strong>
								</Button>
							</Box>
						</motion.div>
					) : !!userListeningMetrics && !loading ? ( // METRICS STEPPER
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key="metrics"
						>
							<Typography variant="h4" pb={2} sx={{ fontWeight: 'bold' }}>
								Your Stats
							</Typography>
							<Divider />
							<Typography variant="h5" pt={1} pb={2} sx={{ fontWeight: 'bold' }}>
								Popularity Score - {userListeningMetrics.popularity} / 100
							</Typography>
							<BorderLinearProgress variant="determinate" value={userListeningMetrics.popularity} />
							<Typography variant="h5" pt={2} sx={{ fontWeight: 'bold' }}>
								Average Tempo - {userListeningMetrics.tempo} bpm (beats per minute)
							</Typography>
							<Typography variant="h5" pt={2} sx={{ fontWeight: 'bold' }}>
								Audio Feature Analysis
							</Typography>
							<Radar
								width={700}
								height={700}
								circular={true}
								data={{
									labels: ['General Mood', 'Intensity', 'Danceability', 'Instrumentalness', 'Acousticness'],
									datasets: [
										{
											label: 'Stats from last 100 top tracks',
											data: [
												userListeningMetrics?.generalMood,
												userListeningMetrics?.intensity,
												userListeningMetrics?.danceability,
												userListeningMetrics?.instrumentalness,
												userListeningMetrics?.acousticness
											],
											backgroundColor: 'rgba(141, 179, 139, 0.2)',
											borderColor: '#4b9a2e',
											borderWidth: 2,
										}
									]
								}}
								options={{
									layout: {
										padding: 20
									},
									plugins: {
										legend: {
											labels: {
												// This more specific font property overrides the global property
												color: 'white',
												font: {
													size: 12,
													family: 'Zen Kaku Gothic Antique',
												}
											}
										}
									},
									scales: {
										r: {
											pointLabels: {
												color: 'white',
												font: {
													size: 14,
													family: 'Zen Kaku Gothic Antique',
												}
											},
											min: 0,
											max: 100,
										}
									}
								}}
							/>
						</motion.div>
					) : (
						// LOADER
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key="loading"
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
							}}
							class="loader"
						>
							<Loader />
						</motion.div>
					)}
				</AnimatePresence>
			</Paper>
		</Grid>
	);
}

export default UserListeningMetrics;
