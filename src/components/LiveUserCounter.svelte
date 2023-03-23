<script lang="ts">
	export let userCount: number;
</script>

<p>
	{userCount} Users Online
</p>
<div class="blob green" />

<style lang="scss">
	p {
		margin: 0;
		background-color: aliceblue;
		padding: 20px;
		color: var(--primary-colour);
	}

	.blob.green {
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
