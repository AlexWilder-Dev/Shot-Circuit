import { useEffect, useRef } from 'react';
import { MOMENTS } from '../data/bar';
import { londonNow } from '../lib/hours';
import { useMoment, useNow } from '../lib/state';

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/** Their own four moments; picking one reorders the shot list. */
export function MomentPicker({ sticky = false }: { sticky?: boolean }) {
  const { moment, auto, setMoment } = useMoment();
  const now = useNow();
  const current = MOMENTS.find((m) => m.id === moment)!;
  const row = useRef<HTMLDivElement>(null);

  // On phones the chips scroll sideways; keep the picked one in view without moving the page.
  useEffect(() => {
    const el = row.current;
    const on = el?.querySelector<HTMLElement>('[aria-checked="true"]');
    if (!el || !on || el.scrollWidth <= el.clientWidth) return;
    const left = el.scrollLeft + on.getBoundingClientRect().left - el.getBoundingClientRect().left - (el.clientWidth - on.offsetWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
  }, [moment]);
  return (
    <div className={'moments' + (sticky ? ' moments--sticky' : '')}>
      <p className="moments__q" id="moment-q">What’s the moment?</p>
      <div ref={row} className="moments__chips" role="radiogroup" aria-labelledby="moment-q">
        {MOMENTS.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={m.id === moment}
            className={'chip' + (m.id === moment ? ' is-on' : '')}
            onClick={() => setMoment(m.id)}
          >
            {m.short}
          </button>
        ))}
      </div>
      <p className="moments__line">
        <strong>{current.label}.</strong> {current.line}
        {auto && <span className="moments__auto"> Picked for {hhmm(londonNow(now).minutes)} in Brixton.</span>}
      </p>
    </div>
  );
}
