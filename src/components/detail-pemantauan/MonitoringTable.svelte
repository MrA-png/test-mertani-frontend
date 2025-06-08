<script lang="ts">
	interface MonitoringData {
		datetime: string;
		rainfall: number;
		waterLevel: number;
		windDirection: number;
	}

	const data: MonitoringData[] = [
		{ datetime: '2025-01-11 17:00', rainfall: 0, waterLevel: 80, windDirection: 76 },
		{ datetime: '2025-01-11 16:00', rainfall: 1, waterLevel: 79, windDirection: 75 },
		{ datetime: '2025-01-11 15:00', rainfall: 0, waterLevel: 78, windDirection: 77 },
		{ datetime: '2025-01-11 14:00', rainfall: 0, waterLevel: 78, windDirection: 76 },
		{ datetime: '2025-01-11 13:00', rainfall: 2, waterLevel: 77, windDirection: 74 },
		{ datetime: '2025-01-11 12:00', rainfall: 0, waterLevel: 76, windDirection: 73 },
		{ datetime: '2025-01-11 17:00', rainfall: 0, waterLevel: 80, windDirection: 76 },
		{ datetime: '2025-01-11 16:00', rainfall: 1, waterLevel: 79, windDirection: 75 },
		{ datetime: '2025-01-11 15:00', rainfall: 0, waterLevel: 78, windDirection: 77 },
		{ datetime: '2025-01-11 14:00', rainfall: 0, waterLevel: 78, windDirection: 76 },
		{ datetime: '2025-01-11 13:00', rainfall: 2, waterLevel: 77, windDirection: 74 },
		{ datetime: '2025-01-11 12:00', rainfall: 0, waterLevel: 76, windDirection: 73 }
	];

	$: sortedData = [...data].sort(
		(a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
	);
</script>

<div class="border rounded-lg bg-white">
	<div class="flex font-normal text-xl p-4 items-center">
		<span>Data Pemantauan</span>
	</div>
	<hr class="border-t border-gray-200 py-2" />

	<div class="overflow-x-auto p-4">
		<table class="w-full table-auto text-sm border border-gray-200">
			<thead class="bg-gray-100">
				<tr>
					<th class="px-4 py-2 text-left font-normal border-b whitespace-nowrap">Tanggal & Waktu</th
					>
					<th class="px-4 py-2 text-left border-b font-normal whitespace-nowrap"
						>Rainfall <span class="text-xs">(mm)</span></th
					>
					<th class="px-4 py-2 text-left font-normal border-b whitespace-nowrap"
						>Water Level <span class="text-xs">(cm)</span></th
					>
					<th class="px-4 py-2 text-left font-normal border-b whitespace-nowrap"
						>Wind Direction <span class="text-xs">(°)</span></th
					>
				</tr>
			</thead>
			<tbody>
				{#each sortedData as row}
					<tr class="border-t hover:bg-gray-50 relative">
						<td class="px-4 py-2 border-b whitespace-nowrap">{row.datetime}</td>
						<td class="px-4 py-2 border-b whitespace-nowrap">{row.rainfall}</td>
						<td class="px-4 py-2 border-b whitespace-nowrap">{row.waterLevel}</td>
						<td class="px-4 py-2 border-b whitespace-nowrap">{row.windDirection}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
