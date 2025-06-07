<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Chart,
		registerables,
		type TooltipItem,
		type ChartOptions,
		type ChartData,
		type ChartConfiguration
	} from 'chart.js';
	import 'chartjs-adapter-date-fns';

	let canvas: HTMLCanvasElement;
	Chart.register(...registerables);

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
				data: [12, 14, 20, 30, 25, 10, 18, 22, 17, 19, 23],
				borderColor: '#3b82f6',
				backgroundColor: '#3b82f6',
				yAxisID: 'y1',
				tension: 0.4
			},
			{
				label: 'Wind Direction (°)',
				data: [180, 170, 160, 260, 200, 230, 240, 210, 180, 150, 90],
				borderColor: '#ef4444',
				backgroundColor: '#ef4444',
				yAxisID: 'y2',
				tension: 0.4
			},
			{
				label: 'Water Level (cm)',
				data: [30, 28, 35, 30, 32, 50, 45, 48, 42, 40, 36],
				borderColor: '#f59e0b',
				backgroundColor: '#f59e0b',
				yAxisID: 'y3',
				tension: 0.4
			}
		]
	};

	const options: ChartOptions<'line'> = {
		responsive: true,
		interaction: {
			mode: 'index' as const,
			intersect: false
		},
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					usePointStyle: true, 
					pointStyle: 'circle',
					boxWidth: 12, 
					boxHeight: 12,
				}
			},
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<'line'>) => {
						const value = context.parsed.y;
						const label = context.dataset.label || '';
						if (label.includes('Rainfall')) return `Rainfall : ${value} mm`;
						if (label.includes('Water Level')) return `Water level : ${value} cm`;
						if (label.includes('Wind Direction')) return `Wind Direction: ${value} ° BL`;
						return `${label}: ${value}`;
					}
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
			},
			y1: {
				stacked: false,
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
				stacked: false,
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
				stacked: false,
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					text: 'water level (mm)'
				},
				min: 0
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

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<canvas bind:this={canvas} class="w-full h-96"></canvas>
