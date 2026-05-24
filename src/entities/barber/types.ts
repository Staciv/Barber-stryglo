export type BarberProfile = {
  id: string;
  name: string;
  specialization?: string;
  bio?: string;
  serviceIds: string[];
  isActive: boolean;
};
