<script lang="ts">
    export let name = "Nama Device";
    export let id = "Id Device";
    export let status = "Online";
</script>

<div class="p-6">
    <div class="text-lg font-semibold">{name}
        <span class="ml-2 px-2 py-1 text-sm rounded bg-green-100 text-green-800">{status}</span>
    </div>
    <div class="text-sm text-gray-600">{id}</div>
</div>
  