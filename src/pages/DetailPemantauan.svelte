<script lang="ts">
	import DeviceStatus from '../components/informasi-device/DeviceStatus.svelte';
	import SensorPlaceholder from '../components/detail-pemantauan/SensorPlaceholder.svelte';
</script>

<DeviceStatus name="Nama Device" id="Id Device" status="Online" />
<hr class="border-t border-gray-200" />

<div class="flex justify-between items-center gap-4 mt-4 mb-6 p-4">
	<button
		class="flex items-center border border-gray-300 bg-gray-100 p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
	>
		<img src="/assets/icons/icon-plus.svg" alt="icon plus" class="w-5 h-5 mr-2" />
		Pilih Sensor
	</button>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2 bg-white border border-gray-300 p-2 rounded-lg shadow-sm">
			<input
				type="datetime-local"
				class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<img
				src="/assets/icons/icon-arrow-right.svg"
				alt="arrow icon"
				class="w-3 h-3 text-gray-600 cursor-pointer"
			/>
			<input
				type="datetime-local"
				class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<img
				src="/assets/icons/icon-calender.svg"
				alt="calendar icon"
				class="w-4 h-4 text-gray-600 cursor-pointer"
			/>
		</div>

		<div class="relative">
			<select
				class="block w-auto border border-gray-300 pl-2 pr-10 py-2 rounded-md text-sm text-gray-500 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option>Semua Data</option>
			</select>
			<img
				src="/assets/icons/icon-dropdown.svg"
				alt="dropdown icon"
				class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
			/>
		</div>

		<button
			class="border border-gray-300 bg-white px-2 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
		>
			<img src="/assets/icons/icon-download.svg" alt="icon download" class="w-5 h-5" />
		</button>
	</div>
</div>

<div class="h-[420px] flex items-center justify-center">
	<SensorPlaceholder />
</div>

<style>
	input[type='datetime-local']::-webkit-calendar-picker-indicator {
		opacity: 0;
		display: none;
	}

	input[type='datetime-local']::-webkit-inner-spin-button,
	input[type='datetime-local']::-webkit-clear-button {
		display: none;
	}
</style>
