<script lang="ts">
	import DetailDevice from '../components/detail-pemantauan/DetailDevice.svelte';
	import InfoItem from '../components/informasi-device/InfoItem.svelte';

	const device = {
		name: 'Pos Curah Hujan',
		id: 'MTI-XYZHAHA',
		token: 'b19d4fba-aced-44d6-9c50-f54002c2d0f3',
		password: 'inipassword',
		specification: 'tidak berspesifikasi',
		description: 'tidak memiliki deskripsi khusus',
		tag: 'Tag 1',
		interval: '60 Menit',
		lastUpdate: '12-12-2025 19:00:07 WIB',
		latitude: -1.924123,
		longitude: 116.09231,
		installationDate: '12-1-2025',
		installer: 'Yutiman'
	};
</script>

<DetailDevice />
<hr class="border-t border-gray-200" />

<div class="p-6 h-[37rem] overflow-auto">
	<div class="mb-4">
		<h3 class="text-normal font-semibold mb-4">Data Pos</h3>
		<div class="grid gap-y-3">
			<InfoItem label="Nama Device" value={device.name} />
			<InfoItem label="Id Device" value={device.id} badge />
			<InfoItem label="Token" value={device.token} copy />
			<InfoItem label="Password" value={device.password} password />
			<InfoItem label="Spesifikasi" value={device.specification} />
			<InfoItem label="Deskripsi" value={device.description} />
			<InfoItem label="Tag Device" value={device.tag} tag />
			<InfoItem label="Interval" value={device.interval} />
			<InfoItem label="Last Update" value={device.lastUpdate} />
		</div>
	</div>
	<hr class="border-t border-gray-200" />

	<div class="mb-4 mt-2">
		<h3 class="text-normal font-semibold mb-4">Lokasi</h3>
		<div class="grid gap-y-3">
			<InfoItem label="Latitude" value={`${device.latitude}`} />
			<InfoItem label="Longitude" value={`${device.longitude}`} />
		</div>
	</div>
	<hr class="border-t border-gray-200" />

	<div class=" mt-2">
		<h3 class="text-normal font-semibold mb-4">Instalasi</h3>
		<div class="grid gap-y-3">
			<InfoItem label="Tanggal Pemasangan" value={device.installationDate} />
			<InfoItem label="Instalator" value={device.installer} />
		</div>
	</div>
</div>
