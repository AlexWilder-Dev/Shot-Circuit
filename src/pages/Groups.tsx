import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BAR, DAY_NAMES, HOURS, MOMENTS, PHOTOS, type MomentId } from '../data/bar';
import { Fascia } from '../components/Fascia';
import { StatusStrip } from '../components/StatusStrip';
import { Photo } from '../components/Photo';

type Sent = { name: string; size: number; date: string; moment: MomentId };

const todayIso = () => new Date().toISOString().slice(0, 10);
// "Wednesday to Sunday", read off the hours in week order.
const openDays = (() => {
  const week = [1, 2, 3, 4, 5, 6, 0].filter((d) => HOURS[d]);
  return week.length > 1 ? `${DAY_NAMES[week[0]]} to ${DAY_NAMES[week[week.length - 1]]}` : DAY_NAMES[week[0]];
})();

export function Groups() {
  const [size, setSize] = useState(8);
  const [moment, setMoment] = useState<MomentId>('start');
  const [date, setDate] = useState('');
  const [sent, setSent] = useState<Sent | null>(null);
  const [dayWarning, setDayWarning] = useState('');

  const onDate = (v: string) => {
    setDate(v);
    const d = v ? new Date(v + 'T12:00:00') : null;
    setDayWarning(d && !HOURS[d.getDay()] ? `We’re closed on ${DAY_NAMES[d.getDay()]}s. Open ${openDays}.` : '');
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSent({ name: String(f.get('name') || '').trim().split(' ')[0], size, date, moment });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prettyDate = (iso: string) =>
    iso ? new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '';

  return (
    <>
      <Fascia compact />
      <StatusStrip />
      <main id="main" tabIndex={-1} className="groups">
        <header className="poster">
          <div className="poster__text">
            <p className="poster__addr">
              14 Market Row
              <br />
              Brixton Village
              <br />
              SW9 8LD
            </p>
            <h1 className="poster__h">Bringing a crowd?</h1>
            <p className="poster__p">
              {BAR.walkIn} Birthdays, big tables, a round for everyone: tell us when you’re coming and roughly how many, and we’ll get back to you.
            </p>
          </div>
          <Photo photo={PHOTOS.barStaff} sizes="(min-width: 900px) 34vw, 100vw" className="poster__photo" eager />
        </header>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.section
              key="done"
              className="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
            >
              <h2 className="sent__h">Got it{sent.name ? `, ${sent.name}` : ''}.</h2>
              <p className="sent__p">
                A heads-up for <strong>{sent.size}</strong>
                {sent.date && (
                  <>
                    {' '}on <strong>{prettyDate(sent.date)}</strong>
                  </>
                )}
                , {MOMENTS.find((m) => m.id === sent.moment)!.label.toLowerCase()}. {BAR.signOff}
              </p>
              <p className="sent__demo">
                This is a demo site, so nothing was sent. To reach the bar, call <a href={BAR.phone.href}>{BAR.phone.display}</a> or email{' '}
                <a href={`mailto:${BAR.email}`}>{BAR.email}</a>.
              </p>
              <button type="button" className="btn btn--line" onClick={() => setSent(null)}>Send another</button>
            </motion.section>
          ) : (
            <motion.form key="form" className="form" onSubmit={submit} initial={false} exit={{ opacity: 0, y: -10 }}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
              </div>
              <div className="field">
                <label htmlFor="email">
                  Email <span className="field__opt">optional</span>
                </label>
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="date">Which day?</label>
                <input id="date" name="date" type="date" min={todayIso()} value={date} onChange={(e) => onDate(e.target.value)} required aria-describedby="date-hint" />
                <p id="date-hint" className={'field__hint' + (dayWarning ? ' is-warn' : '')}>{dayWarning || `Open ${openDays}.`}</p>
              </div>

              <fieldset className="field">
                <legend>How many of you?</legend>
                <div className="stepper">
                  <button type="button" onClick={() => setSize((s) => Math.max(2, s - 1))} aria-label="Fewer">−</button>
                  <output aria-live="polite">{size}</output>
                  <button type="button" onClick={() => setSize((s) => Math.min(60, s + 1))} aria-label="More">+</button>
                </div>
              </fieldset>

              <fieldset className="field">
                <legend>What’s the moment?</legend>
                <div className="moments__chips">
                  {MOMENTS.map((m) => (
                    <label key={m.id} className={'chip chip--radio' + (m.id === moment ? ' is-on' : '')}>
                      <input type="radio" name="moment" value={m.id} checked={m.id === moment} onChange={() => setMoment(m.id)} />
                      {m.short}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label htmlFor="notes">
                  Anything else? <span className="field__opt">optional</span>
                </label>
                <textarea id="notes" name="notes" rows={3} placeholder="Whose birthday, roughly what time…" />
              </div>

              <button type="submit" className="btn btn--blue btn--big">Send the heads-up</button>
            </motion.form>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
