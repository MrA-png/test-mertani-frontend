<script lang="ts">
	import SensorTable from '../components/sensor-device/SensorTable.svelte';
	import Pagination from '../components/sensor-device/Pagination.svelte';
	import SensorDevice from '../components/sensor-device/SensorDevice.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Search from 'lucide-svelte/icons/search';
</script>

<SensorDevice />
<hr class="border-t border-gray-200" />

<div class="p-5">
	<div class="flex items-center mb-4">
		<div class="flex border border-gray-300 rounded-md overflow-hidden">
			<div class="relative bg-gray-100 flex items-center px-3">
				<select
					class="appearance-none bg-transparent pr-5 text-sm text-gray-700 focus:outline-none"
				>
					<option>Nama</option>
					<option>ID</option>
					<option>Satuan</option>
				</select>
				<ChevronDown
					class="w-4 h-4 absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
				/>
			</div>

			<input type="text" placeholder="Cari" class="px-4 py-2 text-sm focus:outline-none" />

			<button class="px-3 flex items-center text-gray-500">
				<Search class="w-4 h-4" />
			</button>
		</div>
	</div>

	<div class="bg-white h-[28rem]">
		<SensorTable />
	</div>
	<hr class="border-t border-gray-200" />

	<Pagination />
</div>
