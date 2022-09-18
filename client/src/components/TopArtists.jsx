import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function TopArtists({
	topArtists,
	setSelectedArtist,
	currentPage,
	setCurrentPage,
	loading,
}) {
	const NUM_ITEMS_ARTISTS = 12;

	return (
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
					{(loading && topArtists.length > 0
						? Array.from(new Array(NUM_ITEMS_ARTISTS))
						: topArtists?.items ?? []
					).map((artist) => {
						return artist ? (
							<Grid item xs={4} sm={3} md={2} lg={2} xl={3}>
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
							<Grid item xs={6} sm={3} md={3} lg={3} xl={2}>
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
					count={Math.ceil(topArtists?.total / NUM_ITEMS_ARTISTS)}
					page={currentPage}
					onChange={(_, page) => {
						setCurrentPage(page);
					}}
					shape="rounded"
				/>
			</Paper>
		</Grid>
	);
}

export default TopArtists;
