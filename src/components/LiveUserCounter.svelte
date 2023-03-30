<script lang="ts">
	export let userCount: number;
</script>

<div class="wrapper">
	<p>
		{new Intl.NumberFormat().format(userCount)} Users Online
	</p>
	<div class="blob green" />
</div>

<style lang="scss">
	p {
		margin: 0;
		padding: 20px;
		color: var(--primary-text-color);
		background-color: var(--primary-background-color);
	}

	.blob.green {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		position: absolute;
		top: 5px;
		right: 5px;
		background: rgba(51, 217, 178, 1);
		box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
		animation: pulse-green 2s infinite;
	}

	@keyframes pulse-green {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
		}

		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
		}

		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
		}
	}
</style>
