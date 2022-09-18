import React from 'react';

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
				{!userListeningMetrics && !loading ? (
					<>
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
								onClick={generateMetrics}
							>
								Generate Now
							</Button>
						</Box>
					</>
				) : !!userListeningMetrics && !loading ? (
					<div>DATA</div>
				) : (
					<Loader />
				)}
			</Paper>
		</Grid>
	);
}

export default UserListeningMetrics;
