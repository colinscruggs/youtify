import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Loader() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
			class="loader"
		>
			<svg
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
				enable-background="new 0 0 100 100"
			>
				<rect
					fill="#83ad81"
					width="7"
					height="100"
					transform="translate(0) rotate(180 3 50)"
				>
					<animate
						attributeName="height"
						attributeType="XML"
						dur="2s"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
						values="30;100;30"
						repeatCount="indefinite"
						begin="0s"
					/>
				</rect>
				<rect
					x="17"
					fill="#6fa16d"
					width="7"
					height="100"
					transform="translate(0) rotate(180 20 50)"
				>
					<animate
						attributeName="height"
						attributeType="XML"
						dur="2s"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
						values="30;100;30"
						repeatCount="indefinite"
						begin="0.1s"
					/>
				</rect>
				<rect
					x="40"
					fill="#5b9559"
					width="7"
					height="100"
					transform="translate(0) rotate(180 40 50)"
				>
					<animate
						attributeName="height"
						attributeType="XML"
						dur="2s"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
						values="30;100;30"
						repeatCount="indefinite"
						begin="0.3s"
					/>
				</rect>
				<rect
					x="60"
					fill="#468946"
					width="7"
					height="100"
					transform="translate(0) rotate(180 58 50)"
				>
					<animate
						attributeName="height"
						attributeType="XML"
						dur="2s"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
						values="30;100;30"
						repeatCount="indefinite"
						begin="0.5s"
					/>
				</rect>
				<rect
					x="80"
					fill="#2e7d32"
					width="7"
					height="100"
					transform="translate(0) rotate(180 76 50)"
				>
					<animate
						attributeName="height"
						attributeType="XML"
						dur="2s"
						calcMode="spline"
						keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
						values="30;100;30"
						repeatCount="indefinite"
						begin="0.125s"
					/>
				</rect>
			</svg>

			<Typography
				variant="h6"
				align="center"
				sx={{ mt: 1, width: '50%' }}
			>
				Calculating your results...
			</Typography>
		</Box>
	);
}
