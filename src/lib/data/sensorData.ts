export interface DatasetEntry {
	label: string;
	data: number[];
	borderColor: string;
	backgroundColor: string;
	yAxisID: string;
	tension: number;
	pointRadius: number;
  }
  

export const labels = [
	'2025-01-11T08:00:00',
	'2025-01-12T08:00:00',
	'2025-01-13T08:00:00',
	'2025-01-14T08:00:00',
	'2025-01-15T08:00:00',
	'2025-01-16T08:00:00',
	'2025-01-17T08:00:00',
	'2025-01-18T08:00:00',
	'2025-01-19T08:00:00',
	'2025-01-20T08:00:00',
	'2025-01-21T08:00:00'
];

export const datasetMap: Record<string, DatasetEntry> = {
	'Rainfall (mm)': {
		label: 'Rainfall (mm)',
		data: [12, 10, 28, 25, 13, 21, 7, 10, 14, 5, 9],
		borderColor: '#3b82f6',
		backgroundColor: '#3b82f6',
		yAxisID: 'y1',
		tension: 0.4,
		pointRadius: 0
	},
	'Wind Direction (°)': {
		label: 'Wind Direction (°)',
		data: [140, 120, 100, 260, 330, 310, 300, 280, 180, 120, 130],
		borderColor: '#ef4444',
		backgroundColor: '#ef4444',
		yAxisID: 'y2',
		tension: 0.4,
		pointRadius: 0
	},
	'Water Level (cm)': {
		label: 'Water Level (cm)',
		data: [28, 26, 34, 30, 32, 60, 55, 50, 54, 32, 35],
		borderColor: '#f59e0b',
		backgroundColor: '#f59e0b',
		yAxisID: 'y3',
		tension: 0.4,
		pointRadius: 0
	}
};
