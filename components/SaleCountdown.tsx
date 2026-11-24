"use client";

import { useEffect, useState } from "react";
import { getSaleOpensAt } from "@/lib/sale";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getParts(target: Date, now: Date): Parts {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function SaleCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = getSaleOpensAt();
    const tick = () => {
      const next = getParts(target, new Date());
      setParts(next);
      if (next.done) {
        window.location.reload();
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ];

  return (
    <div className="countdown" role="timer" aria-live="polite">
      {units.map((unit) => (
        <div key={unit.label} className="countdown-cell">
          <strong>
            {unit.value == null ? "--" : pad(unit.value)}
          </strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
