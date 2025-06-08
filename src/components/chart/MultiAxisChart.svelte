<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import CrosshairPlugin from 'chartjs-plugin-crosshair';
	import { labels, datasetMap } from '$lib/data/sensorData';

	export let isFullscreen: boolean;

	export let selectedSensors: { name: string; checked: boolean }[] = [];

	const initialCanvasWidth = 924;
	const initialCanvasHeight = 400;

	let canvas: HTMLCanvasElement;
	Chart.register(...registerables, CrosshairPlugin);

	let chart: Chart;

	$: if (chart && selectedSensors) {
		const newDatasets = selectedSensors.map((sensor) => datasetMap[sensor.name]).filter(Boolean);
		chart.data.datasets = newDatasets;
		chart.update();
	}

	const data: ChartData<'line'> = {
		labels,
		datasets: []
	};

	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false
		},
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 12,
					boxHeight: 12
				}
			},
			tooltip: {
				usePointStyle: true,
				callbacks: {
					title: (tooltipItems) => {
						const date = tooltipItems[0].parsed.x;
						return new Date(date)
							.toLocaleString('en-GB', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit'
							})
							.replace(',', '');
					},
					label: (context) => {
						const value = context.parsed.y;
						const label = context.dataset.label || '';

						if (label.includes('Rainfall')) return `Rainfall : ${value} mm`;
						if (label.includes('Water Level')) return `Water level : ${value} cm`;
						if (label.includes('Wind Direction')) return `Wind Direction: ${value}° BL`;

						return `${label} : ${value}`;
					},
					labelPointStyle: (context) => {
						const label = context.dataset.label || '';
						let color = '#000';

						if (label.includes('Rainfall'))
							color = '#3b82f6'; // blue
						else if (label.includes('Water Level'))
							color = '#f59e0b'; // orange
						else if (label.includes('Wind Direction')) color = '#ef4444'; // red

						return {
							pointStyle: 'line',
							rotation: 90,
							borderWidth: 2
						};
					},
					labelColor: (context) => {
						const label = context.dataset.label || '';
						let color = '#000';

						if (label.includes('Rainfall')) color = '#3b82f6';
						else if (label.includes('Water Level')) color = '#f59e0b';
						else if (label.includes('Wind Direction')) color = '#ef4444';

						return {
							borderColor: color,
							backgroundColor: color
						};
					}
				}
			},
			crosshair: {
				line: {
					color: '#ced4da',
					width: 1,
					dashPattern: [4, 4]
				},
				sync: {
					enabled: false
				},
				zoom: {
					enabled: false
				}
			}
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'day',
					tooltipFormat: 'dd/MM/yyyy',
					displayFormats: {
						day: 'dd/MM/yyyy'
					}
				},
				grid: {
					display: false
				}
			},
			y1: {
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					text: 'Rainfall (mm)'
				},
				min: 0
			},
			y2: {
				type: 'linear',
				display: true,
				position: 'right',
				grid: {
					drawOnChartArea: false
				},
				title: {
					display: true,
					text: 'Wind Direction (°)'
				},
				min: 0
			},
			y3: {
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					text: 'Water Level (cm)'
				},
				min: 0,
				grid: {
					drawOnChartArea: false
				}
			}
		}
	};
	onMount(() => {
		chart = new Chart(canvas, {
			type: 'line',
			data,
			options
		});
	});

	afterUpdate(() => {
		if (!isFullscreen && chart) {
			canvas.style.width = `${initialCanvasWidth}px`;
			canvas.style.height = `${initialCanvasHeight}px`;
			canvas.width = initialCanvasWidth * 2;
			canvas.height = initialCanvasHeight * 2;
			chart.resize();
		}
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<canvas bind:this={canvas} class="bg-white" style="width: 924px; height: 400px;"></canvas>
