<script lang="ts">
	import DeviceStatus from '../components/informasi-device/DeviceStatus.svelte';
	import SensorPlaceholder from '../components/detail-pemantauan/SensorPlaceholder.svelte';
	import { Plus, X, Check } from 'lucide-svelte';
	import MultiAxisChart from '../components/chart/MultiAxisChart.svelte';
	import MonitoringTable from '../components/detail-pemantauan/MonitoringTable.svelte';
	import GrafikControlPanel from '../components/detail-pemantauan/GrafikControlPanel.svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/themes/airbnb.css';
	import { onMount } from 'svelte';

	let dateInput: HTMLInputElement;

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

	let chartSettings = [
		{ name: 'Rainfall (mm)', color: '#3b82f6', axis: 'Kiri', tipe: 'Garis' },
		{ name: 'Wind Direction (°)', color: '#ef4444', axis: 'Kanan', tipe: 'Garis' },
		{ name: 'Water Level (cm)', color: '#f59e0b', axis: 'Kiri', tipe: 'Garis' }
	];

	let options = ['Semua Data', 'Per 30 Menit', 'Per 1 Jam', 'Hari', 'Minggu', 'Bulan', 'Tahun'];
	let selected = options[0];
	let show = false;

	onMount(() => {
		flatpickr(dateInput, {
			mode: 'range',
			enableTime: true,
			time_24hr: true,
			dateFormat: 'Y-m-d H:i',
			defaultHour: 0,
			defaultMinute: 0,
			minuteIncrement: 1,
			showMonths: 2,
			locale: {
				firstDayOfWeek: 1,
				rangeSeparator: ' → '
			}
		});
	});

	function selectOption(option: string) {
		selected = option;
		show = false;
	}

	function handleUpdate(event: CustomEvent) {
		const updatedPanels = event.detail.panels;

		chartSettings = updatedPanels.filter((p: { name: string }) =>
			selectedSensors.some((s: { name: string }) =>
				p.name.toLowerCase().includes(s.name.toLowerCase())
			)
		);
	}

	$: selectedSensors = sensors.filter((s) => s.checked);

	$: selectAll = sensors.every((s) => s.checked);

	function toggleAll() {
		const newState = !selectAll;
		sensors = sensors.map((sensor) => ({ ...sensor, checked: newState }));
	}

	$: chartSettings = chartSettings.filter((p) =>
		selectedSensors.some((s) => p.name.toLowerCase().includes(s.name.toLowerCase()))
	);

	// let selectedSensors = sensors.filter((s) => s.checked);

	const sensorColors: Record<string, string> = {
		'Wind Direction': 'bg-red-500',
		'Water Level': 'bg-orange-400',
		Rainfall: 'bg-blue-400'
	};

	function removeSensor(name: string) {
		sensors = sensors.map((sensor) =>
			sensor.name === name ? { ...sensor, checked: false } : sensor
		);
		updateSelected();
	}

	function updateSelected() {
		selectedSensors = sensors.filter((s) => s.checked);
		chartSettings = [
			{ name: 'Rainfall (mm)', color: '#3b82f6', axis: 'Kiri', tipe: 'Garis' },
			{ name: 'Wind Direction (°)', color: '#ef4444', axis: 'Kanan', tipe: 'Garis' },
			{ name: 'Water Level (cm)', color: '#f59e0b', axis: 'Kiri', tipe: 'Garis' }
		].filter((p) =>
			selectedSensors.some((s) => p.name.toLowerCase().includes(s.name.toLowerCase()))
		);
		showChartAndTable = selectedSensors.length > 0;
	}

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function tampilkan() {
		updateSelected();
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
									on:change={updateSelected}
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
					bind:this={dateInput}
					placeholder="Pilih rentang tanggal & waktu"
					class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[320px]"
				/>

				<img src="/assets/icons/icon-calender.svg" alt="calendar" class="w-4 h-4" />
			</div>

			<div class="relative inline-block text-left w-40">
				<div>
					<button
						type="button"
						class="inline-flex justify-between items-center w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
						on:click={() => (show = !show)}
					>
						{selected}
						<img
							src="/assets/icons/icon-dropdown.svg"
							alt="dropdown icon"
							class="ml-2 w-4 h-4 text-gray-600"
						/>
					</button>
				</div>

				{#if show}
					<div
						class="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<div class="py-1">
							{#each options as option}
								<div
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
									on:click={() => selectOption(option)}
								>
									{option}
								</div>
							{/each}
						</div>
					</div>
				{/if}
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
				<MultiAxisChart bind:isFullscreen {selectedSensors} panels={chartSettings} />
			</div>
			<div class="p-4">
				<MonitoringTable {selectedSensors} />
			</div>
		{:else}
			<SensorPlaceholder />
		{/if}
	</div>

	{#if showGrafikControl}
		<GrafikControlPanel on:close={() => (showGrafikControl = false)} on:update={handleUpdate} />
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

	.flatpickr-calendar {
		z-index: 1000;
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
