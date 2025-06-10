<script lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Topbar from '../components/Topbar.svelte';
	import GrafikControlPanel from '../components/detail-pemantauan/GrafikControlPanel.svelte';

</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar />

	<main class="flex-1 bg-gray-50 flex flex-col">
		<div class="sticky top-0 z-20">
			<Topbar />
		</div>

		<div
			class="bg-white rounded-xl mx-20 my-6 shadow-sm border border-gray-200 content-container overflow-hidden hover:overflow-auto"
		>
			<slot />
		</div>
	</main>
	<!-- <GrafikControlPanel /> -->
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	:global(html) {
		font-family: 'Inter', sans-serif;
	}

	.content-container {
		max-height: calc(100vh - 100px); 
	}

	.content-container::-webkit-scrollbar {
		width: 6px;
	}

	.content-container::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}
</style>
