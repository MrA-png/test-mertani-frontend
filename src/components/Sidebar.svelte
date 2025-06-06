<script lang="ts">
	export let selected = 'Detail Pemantauan';
</script>

<div class="flex h-screen">
	<div class="w-16 bg-white border-r flex flex-col justify-between items-center py-4">
		<div>
			<img src="/assets/images/logo.svg" alt="Logo" class="w-8 h-8 mb-6" />
			<img src="/assets/icons/device.svg" alt="Device Icon" class="w-6 h-6" />
		</div>

		<div>
			<img src="/assets/icons/cta-sidebar.svg" alt="Settings Icon" class="w-6 h-6" />
		</div>
	</div>

	<aside class="w-64 bg-white border-r flex flex-col justify-between">
		<div>
			<div class="px-4 py-6">
				<span class="text-lg font-bold">Admin Dashboard</span>
			</div>

			<div class="px-4 mt-2 mb-2 flex justify-between items-center">
				<span class="text-sm font-semibold text-gray-700">Kelola Device</span>
				<img src="/assets/icons/pin-button.svg" alt="Pin Icon" class="w-4 h-4" />
			</div>

			<nav class="space-y-1 px-2">
				<div
					class="px-3 py-2 rounded cursor-pointer text-sm hover:bg-gray-100"
					class:selected={selected === 'Detail Pemantauan'}
				>
					Detail Pemantauan
				</div>
				<div class="px-3 py-2 rounded cursor-pointer text-sm hover:bg-gray-100">
					Informasi Device
				</div>
				<div class="px-3 py-2 rounded cursor-pointer text-sm hover:bg-gray-100">Sensor Device</div>
			</nav>
		</div>

		<div class="py-4 px-4"></div>
	</aside>
</div>

<style>
	.selected {
		background-color: #f3f4f6;
		font-weight: bold;
	}
</style>
