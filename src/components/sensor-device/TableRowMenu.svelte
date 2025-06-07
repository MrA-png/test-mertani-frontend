<script lang="ts">
	export let onEdit: () => void;
	export let onCalibrate: () => void;
	export let onDelete: () => void;
</script>

<div class="absolute right-0 top-6 w-44 bg-white rounded-lg shadow-lg border text-sm z-50">
	<button
		type="button"
		class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
		on:click={onEdit}
	>
		<img src="/assets/icons/icon-edit.svg" alt="Ubah" class="w-4 h-4" /> Ubah Sensor
	</button>
	<button
		type="button"
		class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
		on:click={onCalibrate}
	>
		<img src="/assets/icons/icon-calibrate.svg" alt="Kalibrasi" class="w-4 h-4" /> Kalibrasi
	</button>
	<hr class="border-t border-gray-200" />
	<button
		type="button"
		class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
		on:click={onDelete}
	>
		<img src="/assets/icons/icon-trash.svg" alt="Hapus" class="w-4 h-4" /> Hapus
	</button>
</div>
