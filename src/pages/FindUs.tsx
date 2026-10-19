import { BAR, MAPS, PHOTOS } from '../data/bar';
import { Fascia } from '../components/Fascia';
import { StatusStrip } from '../components/StatusStrip';
import { MarketRowPlan } from '../components/MarketRowPlan';
import { RouteVideo } from '../components/RouteVideo';
import { HoursTable } from '../components/HoursTable';
import { Photo } from '../components/Photo';
import { Bolt } from '../brand/LogoMark';

const STEPS = [
  { h: 'Out of Brixton Tube', p: 'Turn left onto Brixton Road.' },
  { h: 'Left onto Electric Avenue', p: 'Follow it along to Electric Lane.' },
  { h: 'Right onto Electric Lane', p: 'The Market Row entrance is on your left. Head in under the glass roof.' },
  { h: 'Turn right for Coldharbour Lane', p: 'Where the aisle meets the passage down to Coldharbour Lane, look up for the blue fascia: 14, Market Row.' },
];

export function FindUs() {
  const a = BAR.address;
  return (
    <>
      <Fascia compact />
      <StatusStrip />
      <main id="main" tabIndex={-1} className="find">
        <header className="find__head">
          <p className="eyebrow">Find us</p>
          <h1 className="find__title">
            {a.unit}, <span className="nowrap">{a.street}</span>
          </h1>
          <p className="find__addr">
            {a.area}, {a.city} {a.postcode}
          </p>
          <div className="btnrow">
            <a className="btn btn--blue" href={MAPS.googleWalk} target="_blank" rel="noreferrer">Walk it in Google Maps</a>
            <a className="btn btn--line" href={MAPS.apple} target="_blank" rel="noreferrer">Apple Maps</a>
            <a className="btn btn--line" href={MAPS.citymapper} target="_blank" rel="noreferrer">Citymapper</a>
          </div>
        </header>

        <section className="route" aria-labelledby="route-h">
          <h2 id="route-h" className="sr-only">From Brixton Tube</h2>
          <div className="route__plan">
            <MarketRowPlan />
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.h} className="step">
                <span className="step__n" aria-hidden="true">
                  {i === STEPS.length - 1 ? <Bolt className="step__bolt" /> : i + 1}
                </span>
                <div>
                  <h3 className="step__h">{s.h}</h3>
                  <p className="step__p">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="lookfor" aria-labelledby="look-h">
          <h2 id="look-h" className="lookfor__h">Look up for this</h2>
          <figure className="lookfor__fig lookfor__fig--sign">
            <Photo photo={PHOTOS.fascia} sizes="(min-width: 900px) 55vw, 100vw" />
            <figcaption>The fascia over the open front, with “14” and “Market Row” painted in the corners.</figcaption>
          </figure>
          <figure className="lookfor__fig">
            <Photo photo={PHOTOS.frontDay} sizes="(min-width: 900px) 35vw, 100vw" />
            <figcaption>By day: yellow stools out front, and an A-board pointing the way to fresh wellness shots and shooters.</figcaption>
          </figure>
        </section>

        <section className="otherways" aria-labelledby="other-h">
          <h2 id="other-h" className="otherways__h">Coming another way</h2>
          <dl className="otherways__list">
            <div>
              <dt>Along Coldharbour Lane</dt>
              <dd>Take the Market Row entrance on Coldharbour Lane and walk in. You’ll see the fascia on the passage.</dd>
            </div>
            <div>
              <dt>From Atlantic Road</dt>
              <dd>Come in at Market Row’s Atlantic Road end and follow the aisle until it meets the passage to Coldharbour Lane.</dd>
            </div>
          </dl>
        </section>

        <section className="filmed" aria-labelledby="film-h">
          <h2 id="film-h" className="filmed__h">Or watch the walk</h2>
          <RouteVideo />
        </section>

        <section className="when" aria-labelledby="when-h">
          <h2 id="when-h" className="when__h">Opening hours</h2>
          <HoursTable />
          <p className="when__p">
            Questions? <a href={BAR.phone.href}>{BAR.phone.display}</a> or <a href={`mailto:${BAR.email}`}>{BAR.email}</a>
          </p>
        </section>
      </main>
    </>
  );
}
