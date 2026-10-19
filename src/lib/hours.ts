import { DAY_NAMES, HOURS } from '../data/bar';

/** Current day and minutes-past-midnight in London, whatever the visitor's timezone. */
export function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  return { day, minutes };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export type Status =
  | { open: true; closes: string; minutesLeft: number }
  | { open: false; opensDay: string; opens: string; today: boolean };

export function openStatus(date = new Date()): Status {
  const { day, minutes } = londonNow(date);
  const today = HOURS[day];
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, closes: today.close, minutesLeft: toMin(today.close) - minutes };
  }
  if (today && minutes < toMin(today.open)) {
    return { open: false, opensDay: 'today', opens: today.open, today: true };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (h) return { open: false, opensDay: i === 1 ? 'tomorrow' : DAY_NAMES[d], opens: h.open, today: false };
  }
  return { open: false, opensDay: '', opens: '', today: false };
}

/** Grouped rows for the hours table, e.g. "Wed – Sat 12:00 – 23:30". */
export function hoursRows() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { days: number[]; label: string; hours: string }[] = [];
  for (const d of order) {
    const h = HOURS[d];
    const text = h ? `${h.open} – ${h.close}` : 'Closed';
    const last = rows[rows.length - 1];
    if (last && last.hours === text) last.days.push(d);
    else rows.push({ days: [d], label: '', hours: text });
  }
  for (const r of rows) {
    const short = (d: number) => DAY_NAMES[d].slice(0, 3);
    r.label = r.days.length > 1 ? `${short(r.days[0])} – ${short(r.days[r.days.length - 1])}` : DAY_NAMES[r.days[0]];
  }
  return rows;
}
