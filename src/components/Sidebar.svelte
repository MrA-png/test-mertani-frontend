<script lang="ts">
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<div class="flex h-screen font-inter">
	<div class="w-16 bg-white border-r flex flex-col justify-between items-center py-4">
		<div class="flex flex-col items-center space-y-4">
			<img src="/assets/images/logo.svg" alt="Logo" class="w-9 h-9" />
			<div class="p-2 rounded-xl bg-orange-100">
				<img src="/assets/icons/device.svg" alt="Device Icon" class="w-5 h-5 text-orange-500" />
			</div>
		</div>
		<div class="flex flex-col items-center space-y-4">
			<div class="w-16 h-px bg-gray-200"></div>
			<img src="/assets/icons/cta-sidebar.svg" alt="Settings Icon" class="w-8 h-8" />
		</div>
	</div>

	<aside class="w-64 bg-white border-r flex flex-col justify-between">
		<div>
			<div class="p-4">
				<span class="text-sm text-gray-800">Admin Dashboard</span>
			</div>

			<div class="border-y border-gray-200 bg-gray-100">
				<div class="px-4 py-4 flex justify-between items-center relative">
					<span class="text-sm font-semibold text-gray-800">Kelola Device</span>
					<img
						src="/assets/icons/pin-button.svg"
						alt="Pin Icon"
						class="w-6 h-6 absolute -right-3 top-1/2 transform -translate-y-1/2"
					/>
				</div>
			</div>

			<nav class="space-y-1 px-4 pb-3 mt-6">
				<a
					href="/detail-pemantauan"
					class="px-3 py-2 rounded-lg text-sm font-medium block text-gray-800 hover:bg-gray-100"
					class:bg-gray-100={currentPath === '/detail-pemantauan'}
					class:text-gray-900={currentPath === '/detail-pemantauan'}
				>
					Detail Pemantauan
				</a>

				<a
					href="/informasi-device"
					class="px-3 py-2 rounded-lg text-sm font-medium block text-gray-800 hover:bg-gray-100"
					class:bg-gray-100={currentPath === '/informasi-device'}
					class:text-gray-900={currentPath === '/informasi-device'}
				>
					Informasi Device
				</a>

				<a
					href="/sensor-device"
					class="px-3 py-2 rounded-lg text-sm font-medium block text-gray-800 hover:bg-gray-100"
					class:bg-gray-100={currentPath === '/sensor-device'}
					class:text-gray-900={currentPath === '/sensor-device'}
				>
					Sensor Device
				</a>
			</nav>
		</div>

		<div class="py-4 px-4">
		</div>
	</aside>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	:global(html) {
		font-family: 'Inter', sans-serif;
	}
</style>
