<script lang="ts">
	import Globe, { type GlobeInstance } from 'globe.gl';
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
	let globe: GlobeInstance;

	let location: string;

	onMount(() => {
		const myGlobe = document.getElementById('globe') as HTMLDivElement;
		console.log(myGlobe);

		const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd).domain([0, 1e7]);

		globe = Globe()(myGlobe)
			.globeImageUrl(earthNight)
			.bumpImageUrl(earthTopology)
			.backgroundImageUrl(nightSky)
			.hexBinPointWeight('pop')
			.hexAltitude((d) => d.sumWeight * 6e-8)
			.hexBinResolution(4)
			.hexTopColor((d) => weightColor(d.sumWeight))
			.hexSideColor((d) => weightColor(d.sumWeight))
			// .hexBinMerge(true)
			.enablePointerInteraction(true)
			.onHexHover((current) => {
				if (current && current?.points?.[0]) {
					location = current?.points?.[0]?.country
						? `${current?.points?.[0]?.country} - ${current?.points?.[0]?.city}`
						: `${current?.points?.[0]?.city}`;
				}
			});

		// fetch('./world_population.csv').then(res => res.text())
		//     .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
		//     .then(data => world.hexBinPointsData(data));

		globe.hexBinPointsData(data.globeActivity);

		globe.controls().autoRotate = true;
		globe.controls().autoRotateSpeed = 0.6;
	});
</script>

<Theme />

<div class="wrapper">
	<div id="globe" class="globe" />
	<button on:click={() => invalidate(REALTIME_REPORT_INVALIDATION)}> Refresh </button>
	<div class="counter-wrap">
		<LiveUserCounter userCount={data.activeUsers} />
	</div>
	<div class="hover-wrap">
		{#if location}
			<p>
				{location}
			</p>
		{/if}
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

	p {
		margin: 0;
		padding: 20px;
		color: var(--primary-text-color);
		background-color: var(--primary-background-color);
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

	.hover-wrap {
		position: absolute;
		bottom: 20px;
		left: 20px;
	}

	button {
		// This button could be sexier
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
