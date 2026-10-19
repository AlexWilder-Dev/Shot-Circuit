import { DRINKS, MOMENTS, SECTIONS, type Drink, type MomentId } from '../data/bar';
import { londonNow } from './hours';

/** Which of their moments fits the clock in Brixton right now. */
export function momentForNow(date = new Date()): MomentId {
  const { minutes } = londonNow(date);
  if (minutes < 17 * 60) return 'boost';
  if (minutes < 20 * 60) return 'start';
  if (minutes < 21 * 60 + 30) return 'after';
  return 'keep';
}

export function score(tags: string[], moment: MomentId) {
  const w = MOMENTS.find((m) => m.id === moment)!.weights;
  return tags.reduce((s, t) => s + (w[t] ?? 0), 0);
}

/** Drinks in best-fit order for a moment; ties keep the bar's own order. */
export function rankDrinks(moment: MomentId, list: Drink[] = DRINKS) {
  return list
    .map((d, i) => ({ d, i, s: score(d.tags, moment) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map(({ d, s }) => ({ drink: d, fit: s }));
}

/** Sections reordered so the one that suits the moment comes first. */
export function rankSections(moment: MomentId) {
  return SECTIONS.map((sec, i) => {
    const drinks = rankDrinks(moment, DRINKS.filter((d) => d.section === sec.id));
    const best = drinks.length ? drinks[0].fit : 0;
    return { sec, drinks, best, i };
  }).sort((a, b) => b.best - a.best || a.i - b.i);
}
