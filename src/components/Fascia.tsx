import { Link, NavLink } from 'react-router-dom';
import { Wordmark } from '../brand/Wordmark';
import { BAR } from '../data/bar';

const NAV = [
  { to: '/menu', label: 'Drinks' },
  { to: '/find-us', label: 'Find us' },
  { to: '/groups', label: 'Groups' },
];

function Nav() {
  return (
    <nav className="fascia__nav" aria-label="Main">
      {NAV.map((n) => (
        <NavLink key={n.to} to={n.to} className={({ isActive }) => 'fascia__navlink' + (isActive ? ' is-active' : '')}>
          {n.label}
        </NavLink>
      ))}
      <a className="fascia__navlink fascia__navlink--tel" href={BAR.phone.href}>
        {BAR.phone.display}
      </a>
    </nav>
  );
}

/** The top of every page is their sign, rebuilt in type. */
export function Fascia({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <header className="fascia fascia--compact">
        <Link to="/" className="fascia__home" aria-label="Shot Circuit home">
          <Wordmark className="fascia__wordmark" />
        </Link>
        <Nav />
      </header>
    );
  }
  return (
    <header className="fascia">
      <Nav />
      <h1 className="fascia__sign">
        <Wordmark className="fascia__wordmark" animate title="Shot Circuit" />
        <span className="fascia__kind">Shooter bar</span>
      </h1>
      <div className="fascia__corners" aria-hidden="true">
        <span>14</span>
        <span>Market Row</span>
      </div>
    </header>
  );
}
