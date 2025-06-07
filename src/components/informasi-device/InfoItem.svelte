<script lang="ts">
	export let label;
  export let value: string;
	export let badge = false;
	export let tag = false;
	export let password = false;
	export let copy = false;

	function copyToClipboard() {
		navigator.clipboard.writeText(value.toString());
		alert('Token disalin!');
	}

	let show = false;

	function togglePassword() {
		show = !show;
	}
</script>

<div class="flex items-start space-x-2 text-[14px]">
	<div class="w-40 font-medium text-gray-600">{label}</div>
	<div class="flex-1">
		{#if badge}
			<span
				class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm inline-flex items-center space-x-1"
			>
				<span class="text-gray-500 mr-2">{value}</span>
				<img src="/assets/icons/icon-ceklis.svg" alt="icon ceklis" />
			</span>
		{:else if tag}
			<span
				class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm inline-flex items-center space-x-1"
			>
				<span><img src="/assets/icons/icon-tag.svg" alt="icon tag device" /></span><span
					>{value}</span
				>
			</span>
		{:else if password}
			<span
				class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm inline-flex items-center space-x-1"
			>
				<span class="text-gray-500">{show ? value : '********'}</span>
				<button class="ml-4 text-gray-500 hover:text-gray-800" on:click={togglePassword}>
					<img
						src={show ? '/assets/icons/icon-show.svg' : '/assets/icons/icon-hide.svg'}
						alt={show ? 'Sembunyikan' : 'Tampilkan'}
						class="w-4 h-4 ml-2 cursor-pointer"
					/>
				</button>
			</span>
		{:else if copy}
			<div
				class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm inline-flex items-center space-x-1"
			>
				<span class="truncate text-gray-500 mr-2">{value}</span>
				<button class="ml-2 text-gray-500 hover:text-gray-800" on:click={copyToClipboard}>
					<img src="/assets/icons/icon-copy.svg" alt="icon copy" />
				</button>
			</div>
		{:else}
			<div>{value}</div>
		{/if}
	</div>
</div>
