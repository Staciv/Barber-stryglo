"use client";

import { useEffect, useState } from "react";
import type { BarberProfile } from "@/entities/barber/types";
import type { Service } from "@/entities/service/types";
import { bookingRepository } from "@/features/booking/repository/booking-repository";

export type BookingCatalogState = {
  services: Service[];
  barbers: BarberProfile[];
  isLoading: boolean;
  error: string | null;
};

const initialBookingCatalogState: BookingCatalogState = {
  services: [],
  barbers: [],
  isLoading: true,
  error: null,
};

function getCatalogErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Не удалось загрузить каталог записи";
}

export function useBookingCatalog(): BookingCatalogState {
  const [state, setState] = useState<BookingCatalogState>(initialBookingCatalogState);

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      setState((currentState) => ({
        ...currentState,
        isLoading: true,
        error: null,
      }));

      try {
        const [services, barbers] = await Promise.all([
          bookingRepository.getBookableServices(),
          bookingRepository.getBookableBarbers(),
        ]);

        if (!isMounted) {
          return;
        }

        setState({
          services,
          barbers,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setState({
          services: [],
          barbers: [],
          isLoading: false,
          error: getCatalogErrorMessage(error),
        });
      }
    }

    void loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
