<script lang="ts">
	import DeviceStatus from '../components/informasi-device/DeviceStatus.svelte';
	import SensorPlaceholder from '../components/detail-pemantauan/SensorPlaceholder.svelte';
	import { Plus, X, Check } from 'lucide-svelte';
	import MultiAxisChart from '../components/chart/MultiAxisChart.svelte';
	import MonitoringTable from '../components/detail-pemantauan/MonitoringTable.svelte';
	import GrafikControlPanel from '../components/informasi-device/GrafikControlPanel.svelte';

	let dropdownOpen = false;
	let showChartAndTable = false;
	let isFullscreen = false;
	let selectAll = false;
	let showGrafikControl = false;

	let sensors = [
		{ name: 'Water Level', checked: false },
		{ name: 'Rainfall', checked: false },
		{ name: 'Wind Direction', checked: false }
	];

	$: selectAll = sensors.every((s) => s.checked);

	function toggleAll() {
		const newState = !selectAll;
		sensors = sensors.map((sensor) => ({ ...sensor, checked: newState }));
	}

	let selectedSensors = sensors.filter((s) => s.checked);

	const sensorColors: Record<string, string> = {
		'Wind Direction': 'bg-red-500',
		'Water Level': 'bg-orange-400',
		Rainfall: 'bg-blue-400'
	};

	function removeSensor(name: string) {
		sensors = sensors.map((sensor) =>
			sensor.name === name ? { ...sensor, checked: false } : sensor
		);
		selectedSensors = sensors.filter((s) => s.checked);
	}

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function tampilkan() {
		selectedSensors = sensors.filter((s) => s.checked);
		showChartAndTable = selectedSensors.length > 0;
		dropdownOpen = false;
	}
</script>

<div class={`fullscreen-container ${isFullscreen ? 'fullscreen-active' : ''}`}>
	<DeviceStatus
		name="Nama Device"
		id="Id Device"
		status="Online"
		{isFullscreen}
		{toggleFullscreen}
	/>
	<hr class="border-t border-gray-200" />

	<div class="flex justify-between items-center gap-4 mt-4 mb-2 p-4">
		<div class="relative">
			<button
				class="flex items-center border border-gray-300 bg-gray-50 p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:click={() => (dropdownOpen = !dropdownOpen)}
			>
				<Plus class="w-5 h-5 mr-2" />
				Pilih Sensor
			</button>

			{#if dropdownOpen}
				<div
					class="absolute mt-2 left-0 z-10 w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
				>
					<div class="flex justify-between items-center px-4 pt-2 mb-2">
						<h3 class="font-semibold text-gray-800 text-sm">Pilih Sensor</h3>
						<button
							class="text-gray-500 hover:text-gray-700"
							on:click={() => (dropdownOpen = false)}
						>
							<X class="w-4 h-4" />
						</button>
					</div>
					<hr class="border-gray-200" />

					<div class="space-y-2 p-4">
						{#each sensors as sensor, i}
							<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
								<input
									type="checkbox"
									class="sr-only"
									bind:checked={sensors[i].checked}
									id={`sensor-${i}`}
								/>
								<span
									class={`w-5 h-5 flex items-center justify-center rounded ${sensor.checked ? 'bg-orange-400 text-white' : 'bg-gray-200 text-transparent'}`}
								>
									<Check class="w-4 h-4" />
								</span>
								{sensor.name}
							</label>
						{/each}

						<label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
							<input type="checkbox" class="sr-only" checked={selectAll} on:change={toggleAll} />
							<span
								class={`w-5 h-5 flex items-center justify-center rounded ${selectAll ? 'bg-orange-400 text-white' : 'bg-gray-200 text-transparent'}`}
							>
								<Check class="w-4 h-4" />
							</span>
							Pilih Semua
						</label>
					</div>
					<hr class="border-gray-200" />

					<div class="p-4">
						<button
							on:click={tampilkan}
							disabled={sensors.every((s) => !s.checked)}
							class="w-full text-sm font-medium py-2 rounded-lg
								{sensors.every((s) => !s.checked)
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-orange-400 hover:bg-orange-500 text-white'}"
						>
							Tampilkan
						</button>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2 bg-white border border-gray-300 p-2 rounded-lg shadow-sm">
				<input
					type="datetime-local"
					class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<img src="/assets/icons/icon-arrow-right.svg" alt="arrow" class="w-3 h-3" />
				<input
					type="datetime-local"
					class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<img src="/assets/icons/icon-calender.svg" alt="calendar" class="w-4 h-4" />
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

	{#if selectedSensors.length > 0}
		<div class="flex flex-wrap items-center gap-2 px-4">
			<div class="flex items-center rounded-md border border-gray-300 bg-gray-50">
				<button class="flex items-center" on:click={() => (showGrafikControl = !showGrafikControl)}>
					<img src="/assets/icons/cta-sidebar.svg" alt="Settings Icon" class="w-7 h-7" />
				</button>
			</div>
			{#each selectedSensors as sensor}
				<div
					class="flex items-center gap-2 px-3 py-1 text-sm rounded-md border border-gray-300 bg-gray-50"
				>
					<div class="{sensorColors[sensor.name] || 'bg-gray-400'} w-3 h-3 rounded-sm"></div>

					<span class="text-black">{sensor.name}</span>

					<button on:click={() => removeSensor(sensor.name)}>
						<X class="w-4 h-4 text-gray-400" />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex flex-col space-y-4">
		{#if showChartAndTable}
			<div class="p-4">
				<MultiAxisChart bind:isFullscreen {selectedSensors} />
			</div>
			<div class="p-4">
				<MonitoringTable {selectedSensors} />
			</div>
		{:else}
			<SensorPlaceholder />
		{/if}
	</div>

	{#if showGrafikControl}
		<GrafikControlPanel on:close={() => (showGrafikControl = false)} />
	{/if}
</div>

<style>
	.fullscreen-container {
		transition: all 0.3s ease-in-out;
	}

	.fullscreen-active {
		position: fixed;
		inset: 0;
		background-color: white;
		z-index: 50;
		overflow: auto;
	}

	input[type='datetime-local']::-webkit-calendar-picker-indicator {
		opacity: 0;
		display: none;
	}
	input[type='datetime-local']::-webkit-inner-spin-button,
	input[type='datetime-local']::-webkit-clear-button {
		display: none;
	}
</style>
