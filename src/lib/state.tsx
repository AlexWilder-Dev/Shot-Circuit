import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MomentId } from '../data/bar';
import { momentForNow } from './moments';

/** Re-render on a timer so "open now" stays honest if the page is left open. */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

type MomentState = { moment: MomentId; auto: boolean; setMoment: (m: MomentId) => void };
const MomentContext = createContext<MomentState | null>(null);

export function MomentProvider({ children }: { children: ReactNode }) {
  const now = useNow(60_000);
  const [picked, setPicked] = useState<MomentId | null>(null);
  const moment = picked ?? momentForNow(now);
  return (
    <MomentContext.Provider value={{ moment, auto: picked === null, setMoment: setPicked }}>
      {children}
    </MomentContext.Provider>
  );
}

export function useMoment() {
  const ctx = useContext(MomentContext);
  if (!ctx) throw new Error('useMoment outside MomentProvider');
  return ctx;
}

export const asset = (path: string) => import.meta.env.BASE_URL + path;
