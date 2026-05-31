"use client";

import { useEffect, useState } from "react";

type StoreSelector<T> = {
  <F>(selector: (state: T) => F): F;
};

export function useHydratedStore<T, F>(store: StoreSelector<T>, selector: (state: T) => F) {
  const [data, setData] = useState<F>();
  const state = store(selector);

  useEffect(() => setData(state), [state]);

  return data;
}
