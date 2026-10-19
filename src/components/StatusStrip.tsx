import { openStatus } from '../lib/hours';
import { useNow } from '../lib/state';

export function statusText(s: ReturnType<typeof openStatus>) {
  if (s.open) {
    const soon = s.minutesLeft <= 45;
    return {
      head: 'Open now',
      tail: soon ? `closes ${s.closes}, ${s.minutesLeft} min to go` : `pouring till ${s.closes}`,
    };
  }
  return { head: 'Closed', tail: s.today ? `opens today at ${s.opens}` : `opens ${s.opensDay} at ${s.opens}` };
}

/** Hangs under the fascia like their "Shooter Bar" tag strip. */
export function StatusStrip() {
  const now = useNow();
  const s = openStatus(now);
  const t = statusText(s);
  return (
    <div className={'status' + (s.open ? ' status--open' : ' status--closed')} role="status">
      <span className="status__dot" aria-hidden="true" />
      <strong className="status__head">{t.head}</strong>
      <span className="status__tail">{t.tail}</span>
    </div>
  );
}
