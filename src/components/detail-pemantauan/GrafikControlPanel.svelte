<script lang="ts">
	import { ChevronDown, ChevronUp, X } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	let tipeOptions = ['Garis', 'Batang', 'Arah Angin'];
	const dispatch = createEventDispatcher();

	export let panels: Array<{ name: string; color: string; axis: string; tipe: string }> = []; // Now receives panels as a prop

	// let panels = [
	// 	{ name: 'Rainfall (mm)', color: '#3b82f6', axis: 'Kiri', tipe: 'Garis' },
	// 	{ name: 'Wind Direction (°)', color: '#ef4444', axis: 'Kiri', tipe: 'Garis' },
	// 	{ name: 'Water Level (cm)', color: '#f59e0b', axis: 'Kiri', tipe: 'Garis' }
	// ];

	let expandedPanels = panels.map(() => true);
	let dropdownOpen = panels.map(() => false);

	function updateColor(index: number, newColor: string) {
		panels[index].color = newColor;
		panels = panels;
	}

	function toggleAxis(panelIndex: number, axis: string) {
		panels[panelIndex].axis = axis;
		panels = panels; 
	}

	function togglePanel(index: number) {
		expandedPanels[index] = !expandedPanels[index];
		expandedPanels = expandedPanels;
	}

	function toggleDropdown(index: number) {
		dropdownOpen = dropdownOpen.map((_, i) => (i === index ? !dropdownOpen[i] : false));
		dropdownOpen = dropdownOpen; 
	}

	function selectTipe(panelIndex: number, option: string) {
		panels[panelIndex].tipe = option;
		dropdownOpen[panelIndex] = false;
		panels = panels;
		dropdownOpen = dropdownOpen; 
	}
	function simpanPerubahan() {
		dispatch('update', { panels });
	}

	function handleClose() {
		dispatch('close');
	}
</script>

<div
	class="fixed top-[57px] right-0 w-[280px] h-[calc(100vh-58px)] bg-white border-l border-gray-200 shadow-lg z-30 text-sm flex flex-col"
>
	<div class="flex items-center justify-between px-4 py-4">
		<h2 class="font-semibold text-black">Atur Grafik</h2>
		<button
			on:click={handleClose}
			class="text-gray-500 hover:text-gray-700"
			aria-label="Tutup panel"
		>
			<X class="w-5 h-5" />
		</button>
	</div>
	<hr class="border-t border-gray-200" />
	<div class="flex-1 overflow-y-auto">
		{#each panels as panel, index}
			<div class="border-b">
				<!-- Panel Header -->
				<button
					class="w-full flex items-center justify-between px-4 py-3 font-medium text-black hover:bg-gray-50"
					on:click={() => togglePanel(index)}
				>
					<span>{panel.name}</span>
					{#if expandedPanels[index]}
						<ChevronUp class="w-4 h-4" />
					{:else}
						<ChevronDown class="w-4 h-4" />
					{/if}
				</button>

				<!-- Panel Body -->
				{#if expandedPanels[index]}
					<div class="px-4 pb-4 space-y-4">
						<!-- Y-Axis -->
						<div class="flex items-center">
							<span class="w-24 text-gray-500">Y-Axis</span>
							<div class="flex gap-2">
								<button
									class="px-3 py-1 border rounded text-sm font-normal"
									class:selected={panel.axis === 'Kiri'}
									class:bg-white={panel.axis !== 'Kiri'}
									class:border-amber-500={panel.axis === 'Kiri'}
									class:text-black={panel.axis === 'Kiri'}
									on:click={() => toggleAxis(index, 'Kiri')}
								>
									Kiri
								</button>
								<button
									class="px-3 py-1 border rounded text-sm font-normal"
									class:selected={panel.axis === 'Kanan'}
									class:bg-white={panel.axis !== 'Kanan'}
									class:border-amber-500={panel.axis === 'Kanan'}
									class:text-black={panel.axis === 'Kanan'}
									on:click={() => toggleAxis(index, 'Kanan')}
								>
									Kanan
								</button>
							</div>
						</div>

						<!-- Tipe Grafik -->
						<div class="flex items-center">
							<span id={`tipe-grafik-label-${index}`} class="w-24 text-gray-500">Tipe Grafik</span>
							<div class="relative flex-1">
								<button
									aria-labelledby={`tipe-grafik-label-${index}`}
									class="w-full text-left px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 font-medium flex justify-between items-center"
									on:click={() => toggleDropdown(index)}
								>
									{panel.tipe}
									<svg
										class="w-4 h-4 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{#if dropdownOpen[index]}
									<ul
										class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow z-10"
									>
										{#each tipeOptions as option}
											<li>
												<button
													class="w-full text-left px-4 py-2 text-base cursor-pointer hover:bg-gray-100 rounded-lg"
													class:bg-gray-100={panel.tipe === option}
													on:click={() => selectTipe(index, option)}
												>
													{option}
												</button>
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						</div>

						<!-- Warna -->
						<div class="flex items-center relative">
							<span class="w-24 text-gray-500">Warna</span>

							<label
								class="flex items-center border rounded px-2 py-1 gap-2 flex-1 cursor-pointer bg-white"
							>
								<div class="w-5 h-5 rounded" style="background-color: {panel.color}"></div>
								<span class="text-black text-sm">{panel.color}</span>
								<input
									type="color"
									value={panel.color}
									on:input={(e) => updateColor(index, (e.target as HTMLInputElement).value)}
									class="sr-only"
								/>
							</label>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10">
		<button
			class="w-full py-2 text-sm border border-amber-500 text-amber-500 rounded hover:bg-amber-50 font-medium"
			on:click={simpanPerubahan}
		>
			Simpan perubahan
		</button>
	</div>
</div>

<style>
	button.selected {
		border-color: #facc15;
		border-width: 2px;
	}
</style>
