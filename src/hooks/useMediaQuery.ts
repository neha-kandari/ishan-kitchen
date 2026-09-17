"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query]
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () => useMediaQuery("(max-width: 1023px)");
