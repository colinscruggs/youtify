export default function interpretMetrics(metricsAverages, avgPopularity) {
	const popularity = avgPopularity;
	/* A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. 
	Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric),
	while tracks with low valence sound more negative (e.g. sad, depressed, angry).*/
	const generalMood = metricsAverages.valence;
	// Do you like words in your music?
	const instrumentalness = metricsAverages.instrumentalness;
	const acousticness = metricsAverages.acousticness;
	// How intense is your music?
	const intensity = metricsAverages.energy
	// How danceable is your music?
	const danceability = metricsAverages.danceability;
	// How fast do you like your music?
	const tempo = metricsAverages.tempo;


	return {
		popularity: popularity,
		generalMood: generalMood,
		intensity: intensity,
		danceability: danceability,
		instrumentalness: instrumentalness,
		acousticness: acousticness,
		tempo: tempo,
	};
}
