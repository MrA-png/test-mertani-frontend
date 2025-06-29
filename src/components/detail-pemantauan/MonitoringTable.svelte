<script lang="ts">
	import { labels as defaultLabels, datasetMap as defaultDatasetMap } from '$lib/data/sensorData';

	export let selectedSensors: { name: string; checked: boolean }[] = [];
	export let chartData: { labels: string[]; datasets: { label: string; data: number[] }[] } = {
		labels: [],
		datasets: []
	};

	const sensorNameMap: Record<string, string> = {
		'Rainfall': 'Rainfall (mm)',
		'Wind Direction': 'Wind Direction (°)',
		'Water Level': 'Water Level (cm)'
	};

	function formatDateTime(datetime: string): string {
		const date = new Date(datetime);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${day}-${month}-${year} ${hours}:${minutes}`;
	}

	// Sensor yang dicentang dan dipetakan ke label dataset
	$: selectedSensorNames = selectedSensors
		.filter((s) => s.checked)
		.map((s) => sensorNameMap[s.name])
		.filter(Boolean);

	// Gunakan data default jika chartData.datasets kosong
	let usedLabels: string[] = [];
	let usedDatasetMap: Record<string, { label: string; data: number[] }> = {};

	$: {
		if (chartData.datasets && chartData.datasets.length > 0) {
			usedLabels = chartData.labels;
			usedDatasetMap = {};
			for (const dataset of chartData.datasets) {
				usedDatasetMap[dataset.label] = dataset;
			}
		} else {
			usedLabels = defaultLabels;
			usedDatasetMap = { ...defaultDatasetMap };
		}
	}

	// Buat data tabel
	$: tableData = usedLabels.map((datetime, index) => {
		const row: Record<string, string | number> = {
			datetime: formatDateTime(datetime)
		};
		for (const sensorKey of selectedSensorNames as (keyof typeof usedDatasetMap)[]) {
			row[sensorKey] = usedDatasetMap[sensorKey]?.data[index] ?? '-';
		}
		return row;
	});

	// Urutkan dari tanggal terbaru ke terlama
	$: sortedData = [...tableData].sort(
		(a, b) => new Date(b.datetime as string).getTime() - new Date(a.datetime as string).getTime()
	);
</script>

<div class="border rounded-lg bg-white">
	<div class="flex font-normal text-xl p-4 items-center">
		<span>Data Pemantauan</span>
	</div>
	<hr class="border-t border-gray-200 py-2" />

	<div class="overflow-x-auto p-4">
		{#if selectedSensorNames.length > 0}
			<table class="w-full table-auto text-sm border border-gray-200">
				<thead class="bg-gray-100">
					<tr>
						<th class="px-4 py-2 text-left font-normal border-b whitespace-nowrap">Tanggal</th>
						{#each selectedSensorNames as sensorKey}
							<th class="px-4 py-2 text-left font-normal border-b whitespace-nowrap">
								{usedDatasetMap[sensorKey]?.label}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each sortedData as row}
						<tr class="border-t hover:bg-gray-50">
							<td class="px-4 py-2 border-b whitespace-nowrap">{row.datetime}</td>
							{#each selectedSensorNames as sensorKey}
								<td class="px-4 py-2 border-b whitespace-nowrap">{row[sensorKey]}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-gray-500 text-center">Tidak ada sensor yang dipilih.</p>
		{/if}
	</div>
</div>
