<script lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Topbar from '../components/Topbar.svelte';
</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar />

	<main class="flex-1 bg-gray-50 flex flex-col">
		<Topbar />

		<div class="bg-white rounded-xl mx-20 my-6 shadow-sm border border-gray-200">
			<slot />
		</div>
	</main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	:global(html) {
		font-family: 'Inter', sans-serif;
	}
</style>