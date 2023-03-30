<script lang="ts">
	import Globe from 'globe.gl';
	import * as d3 from 'd3';

	import earthNight from '../assets/images/earth-night.jpg';
	import earthTopology from '../assets/images/earth-topology.png';
	import nightSky from '../assets/images/night-sky.png';
	import { onMount } from 'svelte';
	import { poll } from '../utils/pollReport';
	import { MINUTE, REALTIME_REPORT_INVALIDATION } from '../constants';
	import { invalidate } from '$app/navigation';
	import LiveUserCounter from '../components/LiveUserCounter.svelte';
	import Theme from '../components/Theme.svelte';
	import Logo from '../components/Logo.svelte';

	export let data;

	poll(REALTIME_REPORT_INVALIDATION, 20 * MINUTE);

	$: console.log(data);

	onMount(() => {
		const myGlobe = document.getElementById('globe');
		console.log(myGlobe);

		const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd).domain([0, 1e7]);

		const world = Globe()(myGlobe)
			.globeImageUrl(earthNight)
			.bumpImageUrl(earthTopology)
			.backgroundImageUrl(nightSky)
			.hexBinPointWeight('pop')
			.hexAltitude((d) => d.sumWeight * 6e-8)
			.hexBinResolution(4)
			.hexTopColor((d) => weightColor(d.sumWeight))
			.hexSideColor((d) => weightColor(d.sumWeight))
			.hexBinMerge(true)
			.enablePointerInteraction(false);

		// fetch('./world_population.csv').then(res => res.text())
		//     .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
		//     .then(data => world.hexBinPointsData(data));

		world.hexBinPointsData(data.globeActivity);

		world.controls().autoRotate = true;
		world.controls().autoRotateSpeed = 0.6;
	});
</script>

<Theme />

<div class="wrapper">
	<div id="globe" class="globe" />
	<button on:click={() => invalidate(REALTIME_REPORT_INVALIDATION)}> Refresh </button>
	<div class="counter-wrap">
		<LiveUserCounter userCount={data.activeUsers} />
	</div>
	<div class="logo">
		<Logo />
	</div>
</div>

<style lang="scss">
	.globe {
		width: 100%;
		height: 100%;
	}
	.wrapper {
		position: relative;
	}

	.logo {
		position: absolute;
		top: 40px;
		left: 50%;
		transform: translateX(-50%);
	}

	.counter-wrap {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	button {
		// This button could be sexier
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
