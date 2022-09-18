export default function averageMetrics(metrics) {
	const average = {
		danceability: 0,
		energy: 0,
		speechiness: 0,
		acousticness: 0,
		instrumentalness: 0,
		liveness: 0,
		valence: 0,
		tempo: 0,
	};

	for (let i = 0; i < metrics.length; i++) {
		average.danceability += metrics[i].danceability;
		average.energy += metrics[i].energy;
		average.speechiness += metrics[i].speechiness;
		average.acousticness += metrics[i].acousticness;
		average.instrumentalness += metrics[i].instrumentalness;
		average.liveness += metrics[i].liveness;
		average.valence += metrics[i].valence;
		average.tempo += metrics[i].tempo;
	}

	average.danceability = Math.round(
		(average.danceability / metrics.length).toFixed(2) * 100
	);
	average.energy = Math.round(
		(average.energy / metrics.length).toFixed(2) * 100
	);
	average.speechiness = Math.round(
		(average.speechiness / metrics.length).toFixed(2) * 100
	);
	average.acousticness = Math.round(
		(average.acousticness / metrics.length).toFixed(2) * 100
	);
	average.instrumentalness = Math.round(
		(average.instrumentalness / metrics.length).toFixed(2) * 100
	);
	average.liveness = Math.round(
		(average.liveness / metrics.length).toFixed(2) * 100
	);
	average.valence = Math.round(
		(average.valence / metrics.length).toFixed(2) * 100
	);
	average.tempo = (average.tempo / metrics.length).toFixed(2);

	console.log(average);
	return average;
}
