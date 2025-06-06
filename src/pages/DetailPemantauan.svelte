<script lang="ts">
	import Sidebar from '../components/Sidebar.svelte';
	import Topbar from '../components/Topbar.svelte';
	import DeviceStatus from '../components/DeviceStatus.svelte';
	import SensorPlaceholder from '../components/SensorPlaceholder.svelte';
</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar />

	<main class="flex-1 bg-gray-50 flex flex-col">
		<Topbar />

		<div class="p-6">
			<DeviceStatus name="Nama Device" id="Id Device" status="Online" />

			<div class="flex items-center space-x-2 mb-4">
				<button class="border px-3 py-1 rounded text-sm">+ Pilih Sensor</button>
				<input type="datetime-local" class="border px-2 py-1 rounded text-sm" />
				<span class="text-sm">→</span>
				<input type="datetime-local" class="border px-2 py-1 rounded text-sm" />
				<select class="border px-2 py-1 rounded text-sm">
					<option>Semua Data</option>
				</select>
				<button class="border px-3 py-1 rounded text-sm">⬇️</button>
			</div>

			<div class="bg-white h-[400px] rounded-lg border flex items-center justify-center">
				<SensorPlaceholder />
			</div>
		</div>
	</main>
</div>
