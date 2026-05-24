import type { AdminBarberService } from "@/features/admin-panel/model/types";

export function isEndAfterStart(startTime: string, endTime: string) {
  return endTime > startTime;
}

export function hasDuplicateAssignment(
  assignments: AdminBarberService[],
  barberId: string,
  serviceId: string,
) {
  return assignments.some(
    (assignment) => assignment.barberId === barberId && assignment.serviceId === serviceId,
  );
}
