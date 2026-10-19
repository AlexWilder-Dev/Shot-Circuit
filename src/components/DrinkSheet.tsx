import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DRINKS, DRINK_NOTES, MOMENTS, SECTIONS, type Drink } from '../data/bar';
import { score } from '../lib/moments';
import { Glass, settle } from './Glass';

const GLASS_LABEL = { single: 'Single shot glass', double: 'Double shot glass', tumbler: 'Tumbler' } as const;
const fmtMl = (ml: number) => (Number.isInteger(ml) ? `${ml}` : ml.toFixed(1)) + 'ml';

export function DrinkSheet({ drink, onClose }: { drink: Drink; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const idx = DRINKS.findIndex((d) => d.slug === drink.slug);
  const prev = DRINKS[(idx - 1 + DRINKS.length) % DRINKS.length];
  const next = DRINKS[(idx + 1) % DRINKS.length];
  const section = SECTIONS.find((s) => s.id === drink.section)!;
  const layersTopDown = drink.mixed ? drink.layers : [...settle(drink)].reverse();
  const fits = MOMENTS.filter((m) => score(drink.tags, m.id) > 0);
  const total = drink.layers.reduce((s, l) => s + l.ml, 0);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div className="sheet-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="sheet-backdrop" onClick={onClose} />
      <motion.div
        className="sheet board"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      >
        <button ref={closeRef} type="button" className="sheet__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>

        <div className="sheet__grid">
          <div className="sheet__glasswrap">
            <Glass key={drink.slug} drink={drink} pour="mount" bolt speed={0.8} className="sheet__glass" />
          </div>

          <div className="sheet__body">
            <p className="sheet__kicker">
              {section.title} · {GLASS_LABEL[drink.glass]} · {fmtMl(total)}
            </p>
            <h2 id="sheet-title" className="sheet__title">{drink.name}</h2>
            {DRINK_NOTES[drink.slug] && <p className="sheet__note">{DRINK_NOTES[drink.slug]}</p>}

            <h3 className="sheet__h">{drink.mixed ? 'Mixed from' : 'In the glass, top to bottom'}</h3>
            <ol className="layers">
              {layersTopDown.map((l, i) => (
                <li key={l.name + i} className="layers__row">
                  <span className="layers__swatch" style={{ background: l.colour }} aria-hidden="true" />
                  <span className="layers__name">{l.name}</span>
                  <span className="layers__ml">{fmtMl(l.ml)}</span>
                </li>
              ))}
            </ol>

            {drink.garnish.length > 0 && (
              <>
                <h3 className="sheet__h">Garnish</h3>
                <p className="sheet__garnish">
                  {drink.garnish.map((g) => g.label + (g.optional ? ' (optional)' : '')).join(', ')}
                </p>
              </>
            )}

            {fits.length > 0 && (
              <>
                <h3 className="sheet__h">Good for</h3>
                <ul className="sheet__fits">
                  {fits.map((m) => (
                    <li key={m.id} className="chip chip--static">{m.short}</li>
                  ))}
                </ul>
              </>
            )}

            <p className="sheet__tags">{drink.tags.join(' · ')}</p>
          </div>
        </div>

        <nav className="sheet__nav" aria-label="More drinks">
          <Link to={`/drinks/${prev.slug}`} replace className="sheet__navlink">‹ {prev.name}</Link>
          <Link to={`/drinks/${next.slug}`} replace className="sheet__navlink sheet__navlink--next">{next.name} ›</Link>
        </nav>
      </motion.div>
    </motion.div>
  );
}
