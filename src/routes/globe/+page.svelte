<script lang="ts">
    import { onMount } from 'svelte'
    import Globe from 'globe.gl';
	import * as d3 from 'd3';
    import { scaleSequentialSqrt } from 'd3';

    import earthNight from '../../assets/images/earth-night.jpg'
    import earthTopology from '../../assets/images/earth-topology.png'
    import nightSky from '../../assets/images/night-sky.png'

    onMount(() => {
        const myGlobe = document.getElementById('globe')
        console.log(myGlobe)

        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
        .domain([0, 1e7]);

        const world = Globe()
          (myGlobe)
          .globeImageUrl(earthNight)
          .bumpImageUrl(earthTopology)
          .backgroundImageUrl(nightSky)
          .hexBinPointWeight('pop')
          .hexAltitude(d => d.sumWeight * 6e-8)
          .hexBinResolution(4)
          .hexTopColor(d => weightColor(d.sumWeight))
          .hexSideColor(d => weightColor(d.sumWeight))
          .hexBinMerge(true)
          .enablePointerInteraction(false);
        
        fetch('./world_population.csv').then(res => res.text())
            .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
            .then(data => world.hexBinPointsData(data));
        
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;
    })
    
 
</script>

<div id="globe" class="globe"></div>

<style lang="scss">
.globe {
    width: 100%;
    height: 100%;
}
</style>