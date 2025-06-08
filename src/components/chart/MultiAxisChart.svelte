<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import CrosshairPlugin from 'chartjs-plugin-crosshair';

	export let isFullscreen: boolean;
	
	const initialCanvasWidth = 924;
	const initialCanvasHeight = 400;

	let canvas: HTMLCanvasElement;
	Chart.register(...registerables, CrosshairPlugin);

	let chart: Chart;

	const data: ChartData<'line'> = {
		labels: [
			'2025-01-11',
			'2025-01-12',
			'2025-01-13',
			'2025-01-14',
			'2025-01-15',
			'2025-01-16',
			'2025-01-17',
			'2025-01-18',
			'2025-01-19',
			'2025-01-20',
			'2025-01-21'
		],
		datasets: [
			{
				label: 'Rainfall (mm)',
				data: [12, 10, 28, 25, 13, 21, 7, 10, 14, 5, 9],
				borderColor: '#3b82f6',
				backgroundColor: '#3b82f6',
				yAxisID: 'y1',
				tension: 0.4,
				pointRadius: 0
			},
			{
				label: 'Wind Direction (°)',
				data: [140, 120, 100, 260, 330, 310, 300, 280, 180, 120, 130],
				borderColor: '#ef4444',
				backgroundColor: '#ef4444',
				yAxisID: 'y2',
				tension: 0.4,
				pointRadius: 0
			},
			{
				label: 'Water Level (cm)',
				data: [28, 26, 34, 30, 32, 60, 55, 50, 54, 32, 35],
				borderColor: '#f59e0b',
				backgroundColor: '#f59e0b',
				yAxisID: 'y3',
				tension: 0.4,
				pointRadius: 0
			}
		]
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
				callbacks: {
					label: (context) => {
						const value = context.parsed.y;
						const label = context.dataset.label || '';

						if (label.includes('Rainfall')) return `Rainfall: ${value} mm`;
						if (label.includes('Water Level')) return `Water Level: ${value} cm`;
						if (label.includes('Wind Direction')) return `Wind Direction: ${value}° BL`;

						return `${label}: ${value}`;
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
