"use client";

import { useEffect, useState } from "react";

// Renders the year from the server render, then corrects it on the client so a
// statically generated page never shows a stale copyright year.
export function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
