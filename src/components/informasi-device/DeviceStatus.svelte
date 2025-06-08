<script lang="ts">
	export let name = 'Nama Device';
	export let id = 'Id Device';
	export let status = 'Online';

	export let isFullscreen: boolean = false;
	export let toggleFullscreen: () => void;
</script>

<div class="p-6">
	<div class="text-lg font-semibold text-gray-800 flex items-center justify-between">
		<div class="flex items-center">
			<span>{name}</span>
			<span class="ml-2 px-2 py-1 text-sm rounded bg-green-100 text-green-500">{status}</span>
		</div>
		<button
			type="button"
			class="w-6 h-6 p-1 border border-gray-300 rounded-md cursor-pointer"
			on:click={toggleFullscreen}
			aria-label="Toggle fullscreen"
		>
			<img
				src={isFullscreen ? '/assets/icons/icon-minimize.svg' : '/assets/icons/icon-full.svg'}
				alt=""
				aria-hidden="true"
			/>
		</button>
	</div>
	<div class="text-sm text-gray-600">{id}</div>
</div>
