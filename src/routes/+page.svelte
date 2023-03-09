<script lang="ts">
	import { cityMap } from '../cityLocationData';
	import { testData } from '../__mocks__/test';
	console.log(cityMap);
	console.log(testData);
	type Location = { lat: number; lng: number; country: string };

	const activityWithLatLng = testData.rows
		.map((place) => {
			const country = place.dimensionValues[0].value;
			const city = place.dimensionValues[1].value;

			let locationData;
			if (!city) {
				locationData = cityMap.get(country) as Location;
			} else {
				locationData = cityMap.get(city) as Location;
			}

			console.log(locationData);

			if (!locationData) {
				console.log(`place not found in DB ${country} - ${city}`);
			}

			return {
				city,
				...locationData,
				pop: place.metricValues[0].value
			};
		})
		.filter((singleLocationData) => 'lat' in singleLocationData && 'lng' in singleLocationData);

	// TODO probably should check for duplicates too and group ones without a city
	console.log({ activityWithLatLng });
</script>

{#each activityWithLatLng as { lat, lng, pop, city, country } (city)}
	<div>{city || country} - {lat} - {lng} - {pop}</div>
{/each}
