import { Link } from 'react-router-dom';
import { BAR } from '../data/bar';
import { LogoMark } from '../brand/LogoMark';
import { HoursTable } from './HoursTable';

export function Footer() {
  const a = BAR.address;
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__sign">
          <LogoMark className="footer__mark" />
          <p className="footer__signoff">{BAR.signOff}</p>
        </div>
        <div className="footer__col">
          <h2 className="footer__h">Where</h2>
          <address>
            {a.unit}, {a.street}
            <br />
            {a.area}
            <br />
            {a.city} {a.postcode}
          </address>
          <Link to="/find-us" className="footer__link">How to find us</Link>
        </div>
        <div className="footer__col">
          <h2 className="footer__h">When</h2>
          <HoursTable className="hours--footer" />
        </div>
        <div className="footer__col">
          <h2 className="footer__h">Get in touch</h2>
          <a className="footer__link" href={BAR.phone.href}>{BAR.phone.display}</a>
          <a className="footer__link" href={`mailto:${BAR.email}`}>{BAR.email}</a>
          <a className="footer__link" href={BAR.socials.instagram.href} target="_blank" rel="noreferrer">Instagram {BAR.socials.instagram.handle}</a>
          <a className="footer__link" href={BAR.socials.tiktok.href} target="_blank" rel="noreferrer">TikTok {BAR.socials.tiktok.handle}</a>
          <a className="footer__link" href={BAR.socials.google.href} target="_blank" rel="noreferrer">{BAR.socials.google.label}</a>
        </div>
      </div>
      <p className="footer__credit">Site by AlexWilder-Dev</p>
    </footer>
  );
}
