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
	import { format, subDays } from 'date-fns';
	import { labels as predefinedLabels, datasetMap } from '$lib/data/sensorData';

	let dateInput: HTMLInputElement;
	let selectedDateRange: [Date, Date] | null = null;
	let startDate: Date;
	let endDate: Date;
	let originalStartDate: Date | null = null;
	let originalEndDate: Date | null = null;

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

	let chartData = { labels: [], datasets: [] };

	function generateRandomChartData(start: Date, end: Date) {
		const timestamps: Date[] = [];
		const current = new Date(start);

		// Loop per 1 hari
		while (current <= end) {
			timestamps.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}
		
		type DatasetMapEntry = {
			label: string;
			borderColor: string;
			backgroundColor: string;
			yAxisID: string;
			tension: number;
			pointRadius: number;
		};

		const datasets = selectedSensors.map((sensor) => {
			const setting = chartSettings.find((s) =>
				s.name.toLowerCase().includes(sensor.name.toLowerCase())
			);

			const baseFoundKey = Object.keys(datasetMap).find((key) =>
				key.toLowerCase().includes(sensor.name.toLowerCase())
			);

			const baseData: DatasetMapEntry = baseFoundKey
				? (datasetMap[baseFoundKey] as DatasetMapEntry)
				: {
						label: sensor.name,
						borderColor: '#000',
						backgroundColor: '#00000033',
						yAxisID: 'y1', 
						tension: 0.3, 
						pointRadius: 0 
				  };

			return {
				label: setting?.name || baseData.label || sensor.name,
				borderColor: setting?.color || baseData.borderColor || '#000',
				backgroundColor: (setting?.color ? setting.color + '33' : baseData.backgroundColor) || '#00000033', 
				yAxisID: setting?.axis === 'Kanan' ? 'y2' : 'y1', 
				tension: setting?.tipe === 'Garis' ? baseData.tension ?? 0.3 : 0, 
				pointRadius: setting?.tipe === 'Garis' ? baseData.pointRadius ?? 0 : 0,
				data: timestamps.map(() => Math.floor(Math.random() * 100)),
				type: setting?.tipe === 'Batang' ? 'bar' : setting?.tipe === 'Arah Angin' ? 'scatter' : 'line', 
			};
		});

		return {
			labels: timestamps,
			datasets
		};
	}

	function updateChartByDateRange() {
		if (!startDate || !endDate) return;

		console.log('Menampilkan data dari:', startDate, 'sampai:', endDate);

		chartData = generateRandomChartData(startDate, endDate);
		console.log(chartData);
		showChartAndTable = selectedSensors.length > 0;
	}

	onMount(() => {
		const now = new Date();
		const twoWeeksAgo = subDays(now, 7);

		startDate = twoWeeksAgo;
		endDate = now;
		selectedDateRange = [startDate, endDate];

		const fp = flatpickr(dateInput, {
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
			},
			defaultDate: [format(twoWeeksAgo, 'yyyy-MM-dd HH:mm'), format(now, 'yyyy-MM-dd HH:mm')],
			onOpen: () => {
				originalStartDate = startDate;
				originalEndDate = endDate;
			},
			onChange: (selectedDates: Date[]) => {
				if (selectedDates.length === 2) {
					startDate = selectedDates[0];
					endDate = selectedDates[1];
				}
			},
			onReady: (_, __, instance) => {
				if (instance.calendarContainer.querySelector('.custom-controls')) return;

				// ===== Custom Time Container Styling =====
				const timeContainer = instance.calendarContainer.querySelector('.flatpickr-time');
				if (timeContainer) {
					(timeContainer as HTMLDivElement).style.display = 'flex';
					(timeContainer as HTMLDivElement).style.justifyContent = 'space-between';
					(timeContainer as HTMLDivElement).style.gap = '1rem';
				}

				// ===== Buttons Wrapper =====
				const customControls = document.createElement('div');
				customControls.className = 'custom-controls';
				customControls.style.display = 'flex';
				customControls.style.justifyContent = 'space-between';
				customControls.style.alignItems = 'center';
				customControls.style.padding = '0.5rem';
				customControls.style.marginTop = '0.5rem';

				// Button Hari Ini
				const todayBtn = document.createElement('button');
				todayBtn.textContent = 'Hari ini';
				todayBtn.style.backgroundColor = '#f59e0b';
				todayBtn.style.color = '#fff';
				todayBtn.style.border = 'none';
				todayBtn.style.padding = '6px 12px';
				todayBtn.style.borderRadius = '4px';
				todayBtn.style.cursor = 'pointer';

				todayBtn.addEventListener('click', () => {
					const now = new Date();
					startDate = now;
					endDate = now;
					selectedDateRange = [startDate, endDate];
					instance.setDate([now, now], true);
				});

				// Buttons Ga Jadi + OK
				const rightButtons = document.createElement('div');
				rightButtons.style.display = 'flex';
				rightButtons.style.gap = '0.5rem';

				// Ga Jadi
				const cancelBtn = document.createElement('button');
				cancelBtn.textContent = 'Ga Jadi';
				cancelBtn.style.background = 'none';
				cancelBtn.style.border = 'none';
				cancelBtn.style.color = '#f59e0b';
				cancelBtn.style.padding = '6px 12px';
				cancelBtn.style.borderRadius = '4px';
				cancelBtn.style.cursor = 'pointer';

				cancelBtn.addEventListener('click', () => {
					if (originalStartDate && originalEndDate) {
						startDate = originalStartDate;
						endDate = originalEndDate;
						selectedDateRange = [startDate, endDate];
						instance.setDate([startDate, endDate], true);
					}
					instance.close();
				});

				// OK
				const okBtn = document.createElement('button');
				okBtn.textContent = 'OK';
				okBtn.style.backgroundColor = '#f59e0b';
				okBtn.style.color = '#fff';
				okBtn.style.border = 'none';
				okBtn.style.padding = '6px 12px';
				okBtn.style.borderRadius = '4px';
				okBtn.style.cursor = 'pointer';

				okBtn.addEventListener('click', () => {
					if (startDate && endDate) {
						selectedDateRange = [startDate, endDate];
						updateChartByDateRange();
					}
					instance.close();
				});

				rightButtons.appendChild(cancelBtn);
				rightButtons.appendChild(okBtn);

				customControls.appendChild(todayBtn);
				customControls.appendChild(rightButtons);

				instance.calendarContainer.appendChild(customControls);
			}
		});

		updateChartByDateRange();
	});

	function selectOption(option: string) {
		selected = option;
		show = false;
	}

	function handleUpdate(event: CustomEvent) {
		const updatedPanels = event.detail.panels;
		chartSettings = updatedPanels;
		updateChartByDateRange();
	}

	// function handleUpdate(event: CustomEvent) {
	// 	const updatedPanels = event.detail.panels;

	// 	chartSettings = updatedPanels.filter((p: { name: string }) =>
	// 		selectedSensors.some((s: { name: string }) =>
	// 			p.name.toLowerCase().includes(s.name.toLowerCase())
	// 		)
	// 	);
	// }

	$: selectedSensors = sensors.filter((s) => s.checked);

	$: if (selectedSensors && startDate && endDate) {
		updateChartByDateRange();
	}

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
		updateChartByDateRange();
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
					class="text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[300px]"
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
				<MultiAxisChart bind:isFullscreen {selectedSensors} panels={chartSettings} {chartData} />
			</div>
			<div class="p-4">
				<MonitoringTable {selectedSensors} {chartData} />
			</div>
		{:else}
			<SensorPlaceholder />
		{/if}
	</div>

	{#if showGrafikControl}
		<GrafikControlPanel
			on:close={() => (showGrafikControl = false)}
			on:update={handleUpdate}
			panels={chartSettings}
		/>
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
