import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

function ArtistInfoModal({ artist, open, handleClose }) {
	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle
				variant="h4"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<a
					href={artist?.external_urls.spotify}
					target="_blank"
					rel="noreferrer"
				>
					{artist?.name}
				</a>
				<IconButton
					size="medium"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleClose}
					color="inherit"
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Avatar
					src={artist?.images[0]?.url}
					sx={{ width: 250, height: 250, margin: 'auto' }}
				/>
				<Box
					className="current-artist-stats"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
					}}
				>
					<Divider sx={{ width: '100%', margin: '1rem 0' }}>
						<Chip label="Stats" />
					</Divider>
					<Typography variant="h6" component="h6" sx={{}}>
						{'Followers: ' +
							artist?.followers.total.toLocaleString('en-US')}
					</Typography>
					<Box
						className="current-artist-genres"
						style={{ display: 'flex', paddingTop: '.4rem' }}
					>
						<Typography variant="h6" component="h6">
							Genres:
						</Typography>
						<Grid container spacing={1} ml={1}>
							{artist?.genres.length > 0 ? (
								artist?.genres.map((genre) => (
									<Grid item>
										<Chip
											label={genre}
											variant="outlined"
											sx={{ paddingBottom: '3px' }}
										/>
									</Grid>
								))
							) : (
								<Grid item>
									<Chip
										label={'N/A'}
										variant="outlined"
										style={{ padding: '0 0 4px 0' }}
									/>
								</Grid>
							)}
						</Grid>
					</Box>
					<Box
						className="current-artist-popularity"
						style={{ display: 'flex', paddingTop: '.4rem' }}
					>
						<Typography
							variant="h6"
							component="h6"
							sx={{ marginRight: '1rem' }}
						>
							Popularity:
						</Typography>
						<Box
							sx={{
								position: 'relative',
								display: 'inline-flex',
							}}
						>
							<CircularProgress
								variant="determinate"
								value={artist?.popularity}
							/>
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
								<Typography
									variant="caption"
									component="div"
									color="text.secondary"
								>
									{`${Math.round(artist?.popularity)}%`}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default ArtistInfoModal;
