import { Link } from 'react-router-dom';
import { BAR, MAPS } from '../data/bar';

/** Thumb-reach actions for someone already in Brixton deciding where to go. */
export function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Quick actions">
      <a href={BAR.phone.href} className="actionbar__btn">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="currentColor" /></svg>
        Call
      </a>
      <a href={MAPS.googleWalk} className="actionbar__btn" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor" /></svg>
        Directions
      </a>
      <Link to="/menu" className="actionbar__btn actionbar__btn--main">
        <svg viewBox="0 0 24 32" aria-hidden="true"><path d="M14.5 1 4 18h7.5L9 31 20 13h-7.6z" fill="currentColor" /></svg>
        Shot list
      </Link>
    </nav>
  );
}
