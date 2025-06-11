import { subDays, addDays, formatISO } from 'date-fns';

export interface DatasetEntry {
	label: string;
	data: number[];
	borderColor: string;
	backgroundColor: string;
	yAxisID: string;
	tension: number;
	pointRadius: number;
}

export const labels: string[] = Array.from({ length: 8 }, (_, i) => {
	const date = addDays(subDays(new Date(), 7), i); 
	const fixedTime = new Date(date.setHours(8, 0, 0, 0)); 
	return formatISO(fixedTime, { representation: 'complete' });
});

export const datasetMap: Record<string, DatasetEntry> = {
	'Rainfall (mm)': {
		label: 'Rainfall (mm)',
		data: [12, 10, 28, 25, 13, 21, 7, 15],
		borderColor: '#3b82f6',
		backgroundColor: '#3b82f6',
		yAxisID: 'y1',
		tension: 0.4,
		pointRadius: 0
	},
	'Wind Direction (°)': {
		label: 'Wind Direction (°)',
		data: [140, 120, 100, 260, 330, 310, 300, 70 ],
		borderColor: '#ef4444',
		backgroundColor: '#ef4444',
		yAxisID: 'y2',
		tension: 0.4,
		pointRadius: 0
	},
	'Water Level (cm)': {
		label: 'Water Level (cm)',
		data: [28, 26, 34, 30, 32, 60, 55, 23],
		borderColor: '#f59e0b',
		backgroundColor: '#f59e0b',
		yAxisID: 'y3',
		tension: 0.4,
		pointRadius: 0
	}
};
