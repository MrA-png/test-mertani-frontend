export type Device = {
  id: string;
  name: string;
  status: 'Online' | 'Offline';
};

export type Sensor = {
  name: string;
  id: string;
  calibration: string;
  unit: string;
  description: string;
  calibrated: boolean;
};
