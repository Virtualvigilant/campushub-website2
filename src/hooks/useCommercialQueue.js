import { useEffect, useState } from "react";
import { useLandlord, LORD } from "@/contexts/LandlordContext";

// interval in milliseconds
const INTERVAL = 2 * 60 * 1000; // 2 minutes; change to 10 * 60 * 1000 for 10 minutes

export function useCommercialQueue() {
  const { profile, lordstatus } = useLandlord();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!profile) return;

    const shown = JSON.parse(sessionStorage.getItem("shownModals") || "[]");
    const queue = [];

    // Add modals based on conditions
    if (!profile.properties?.length && !shown.includes("empty")) queue.push("empty");
    if (lordstatus === LORD.UNVERIFIED && !shown.includes("verify")) queue.push("verify");
    if (profile.plan === "Free" && !shown.includes("upgrade")) queue.push("upgrade");
    if (profile.plan === "Free" && !shown.includes("analytics")) queue.push("analytics");
    if (!shown.includes("promo")) queue.push("promo");

    if (!queue.length) return;

    let index = 0;
    setCurrent(queue[index]);

    const interval = setInterval(() => {
      const updatedShown = [...shown, queue[index]];
      sessionStorage.setItem("shownModals", JSON.stringify(updatedShown));

      index += 1;
      if (index >= queue.length) {
        clearInterval(interval);
        setCurrent(null);
      } else {
        setCurrent(queue[index]);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [profile, lordstatus]);

  return current;
}
