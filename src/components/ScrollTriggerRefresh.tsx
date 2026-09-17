"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Images, video and fonts that finish loading after mount shift the page
 * layout, which leaves GSAP ScrollTrigger's cached trigger positions
 * stale — any Reveal whose trigger point moved can get stuck invisible.
 * Refresh once things settle so nothing stays permanently hidden.
 */
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    // Lazy-loaded/below-the-fold images can settle well after `load`.
    const t1 = setTimeout(refresh, 500);
    const t2 = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
