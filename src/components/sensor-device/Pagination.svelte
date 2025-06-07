<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
</script>

<div class="flex justify-between items-center px-4 pt-4 text-sm">
	<div class="flex items-center gap-2">
		Tampilkan
		<div class="relative">
			<select
				class="appearance-none border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
			>
				<option>5</option>
				<option>10</option>
			</select>
			<ChevronDown
				class="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
			/>
		</div>
		1 dari 5 Halaman
	</div>

	<div class="flex items-center gap-2">
		<button class="p-1 text-gray-500 bg-gray-100 rounded"><ChevronLeft /></button>
		<button class="p-1 text-orange-500 border-2 border-orange-400 rounded-md">
			<ChevronRight />
		</button>
	</div>
</div>
