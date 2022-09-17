import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';

function ToolBar({ code, userProfile }) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h5"
					component="div"
					sx={{ flexGrow: 1, paddingLeft: '1em' }}
				>
					Youtify
				</Typography>
				{code && (
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						// TODO: onClick={handleMenu} for logout
						color="inherit"
					>
						<img
							className="prof-picture"
							src={userProfile?.images[0]?.url}
							alt={userProfile?.name}
						/>
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default ToolBar;
