<script lang="ts">
	import TableRowMenu from './TableRowMenu.svelte';
	import type { Sensor } from '../../lib/types';
	import EllipsisHorizontal from 'lucide-svelte/icons/ellipsis';
	import UpDown from 'lucide-svelte/icons/chevrons-up-down';
	let sensors: Sensor[] = [
		{
			name: 'Rainfall',
			id: 'HAHA-rnFl',
			calibration: 'x*0.2',
			unit: 'mm',
			description: 'auto create',
			calibrated: true
		},
		{
			name: 'wind direction',
			id: 'HAHA-windir',
			calibration: 'X*1.5',
			unit: '°',
			description: 'auto create',
			calibrated: true
		},
		{
			name: 'water level',
			id: 'Sensor Type B',
			calibration: '',
			unit: 'm',
			description: 'auto create',
			calibrated: false
		}
	];

	let openMenuIndex: number | null = null;
</script>

<table class="min-w-full text-sm table-auto">
	<thead class="bg-gray-50 text-left">
		<tr>
			<th class="p-3 font-medium">
				<div class="flex justify-between items-center">
					Nama Sensor
					<UpDown class="w-4 h-4" />
				</div>
			</th>
			<th class="p-3 font-medium">
				<div class="flex justify-between items-center">
					Id Sensor
					<UpDown class="w-4 h-4" />
				</div>
			</th>
			<th class="p-3 font-medium">
				<div class="flex justify-between items-center">
					Faktor kalibrasi
					<UpDown class="w-4 h-4" />
				</div>
			</th>
			<th class="p-3 font-medium">
				<div class="flex justify-between items-center">
					Satuan
					<UpDown class="w-4 h-4" />
				</div>
			</th>
			<th class="p-3 text-left font-medium">Deskripsi</th>
			<th class="p-3 text-right font-medium">Aksi</th>
		</tr>
	</thead>
	<tbody>
		{#each sensors as sensor, index}
			<tr class="border-t hover:bg-gray-50 relative">
				<td class="p-3">{sensor.name}</td>
				<td class="p-3">{sensor.id}</td>
				<td class="p-3">
					{#if sensor.calibrated}
						{sensor.calibration}
					{:else}
						<span
							class="bg-gray-100 px-2 border-2 border-gray-400 py-1 rounded text-gray-700 text-base"
							>Belum dikalibrasi</span
						>
					{/if}
				</td>
				<td class="p-3">{sensor.unit}</td>
				<td class="p-3">{sensor.description}</td>
				<td class="p-3 text-right">
					<div class="relative inline-block text-left">
						<button
							class="p-1 rounded hover:bg-gray-100"
							on:click={() => (openMenuIndex = openMenuIndex === index ? null : index)}
						>
							<span class="text-xl font-bold">
								<EllipsisHorizontal />
							</span>
						</button>

						{#if openMenuIndex === index}
							<TableRowMenu
								onEdit={() => alert('Ubah')}
								onCalibrate={() => alert('Kalibrasi')}
								onDelete={() => alert('Hapus')}
							/>
						{/if}
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
