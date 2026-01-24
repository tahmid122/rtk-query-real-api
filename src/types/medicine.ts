export type Medicine = {
  id: string;
  doseName: string;
  slotType?: string;
  doseAmount: string;
  medicineType: string;
  medicineTimes: string[];
  nextDoseTime: string;
  remainingTime: string;
  startDate: string;
  endDate: string;
  note: string;
  notificationEnabled: boolean;
  remainingDose: number;
  totalPills: number;
  takenPills: number;
  slotColorCode: string;
};
