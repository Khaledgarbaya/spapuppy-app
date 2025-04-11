export interface Puppy {
  id: string;
  name: string;
  breed: string;
  ownerName: string;
  ownerPhone: string;
  service: Service;
  status: PuppyStatus;
  notes?: string;
  arrivalTime: string;
  serviceStartTime?: string;
  serviceEndTime?: string;
}

export type Service =
  | "Bath"
  | "Haircut"
  | "Nail Trim"
  | "Full Grooming"
  | "Wash & Blow Dry";

export type PuppyStatus = "waiting" | "in_progress" | "completed" | "cancelled";
