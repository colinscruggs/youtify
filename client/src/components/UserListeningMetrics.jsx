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
import Loader from './Loader';

function UserListeningMetrics({
	userProfile,
	userListeningMetrics,
	generateMetrics,
	loading,
}) {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const MetricPanels = ([key, value]) => {
		console.log(key, value);
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} key={key}>
				<Paper
					elevation={3}
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '1rem',
					}}
				>
					<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
						{value}
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
						{key}
					</Typography>
				</Paper>
			</Grid>
		);
	};

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
							{/* {MetricPanels()} */}
							<Grid item xs={12} sm={6} md={4} lg={3}>
							<Paper
								elevation={3}
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '1rem',
								}}
							>
								{
								Object.entries(userListeningMetrics).map(([key, value]) => {
									return (
										<>
											<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
												{value}
											</Typography>
											<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
												{key}
											</Typography>
										</>
									); 
								})}
							</Paper>
						</Grid>
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
