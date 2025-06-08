<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	// Mapping path ke judul
	const routeNameMap: Record<string, string> = {
		'/detail-pemantauan': 'Detail Pemantauan',
		'/informasi-device': 'Informasi Device',
		'/sensor-device': 'Sensor Device'
	};

	// Ambil path dari URL saat ini
	const pageTitle = derived(page, ($page) => {
		return routeNameMap[$page.url.pathname] ?? 'Halaman Tidak Dikenal';
	});
</script>

<div
	class="w-full bg-white border-b h-[57px] flex items-center justify-between px-6 text-sm text-gray-400"
>
	<div>
		Manajemen Device / <span class="text-black">{$pageTitle}</span>
	</div>
	<div class="text-black">Versi 1.0.0</div>
</div>
