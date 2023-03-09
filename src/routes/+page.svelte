<script lang="ts">
	import { activityWithLatLng } from '../utils/combineAnalyticsWithLocation';
</script>

{#each activityWithLatLng as { lat, lng, pop, city, country } (city)}
	<div>{city || country} - {lat} - {lng} - {pop}</div>
{/each}
