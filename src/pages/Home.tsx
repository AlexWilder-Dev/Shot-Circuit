import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ALSO_POURING, BAR, BOARD, DRINKS, MAPS, PHOTOS } from '../data/bar';
import { Fascia } from '../components/Fascia';
import { StatusStrip } from '../components/StatusStrip';
import { MarketRowPlan } from '../components/MarketRowPlan';
import { MomentPicker } from '../components/MomentPicker';
import { DrinkRow } from '../components/DrinkRow';
import { Photo } from '../components/Photo';
import { useMoment } from '../lib/state';
import { rankDrinks } from '../lib/moments';

const priced = BOARD.filter((b) => b.price);

export function Home() {
  const { moment } = useMoment();
  const ranked = rankDrinks(moment).slice(0, 6);
  const topFit = ranked[0]?.fit ?? 0;

  return (
    <>
      <Fascia />
      <StatusStrip />

      <main id="main" tabIndex={-1} className="home">
        <section className="where" aria-labelledby="where-h">
          <p className="eyebrow">Inside the covered market</p>
          <h2 id="where-h" className="where__h">
            Unit 14, <span className="nowrap">Market Row</span>
          </h2>
          <p className="where__p">
            On the passage from Market Row’s main aisle to Coldharbour Lane. Look up for the blue fascia.
          </p>
          <div className="btnrow btnrow--tight">
            <a className="btn btn--blue" href={MAPS.googleWalk} target="_blank" rel="noreferrer">Directions</a>
            <Link className="btn btn--line" to="/find-us">Step by step</Link>
          </div>
        </section>

        <section className="board onboard" aria-labelledby="board-h">
          <div className="onboard__head">
            <h2 id="board-h" className="board__title">On the shot list</h2>
            <p className="board__sub">{BAR.everyMood}</p>
          </div>
          <MomentPicker />
          <motion.ol className="drinks" layout>
            <AnimatePresence initial={false}>
              {ranked.map(({ drink, fit }) => (
                <DrinkRow key={drink.slug} drink={drink} hot={fit > 0 && fit === topFit} />
              ))}
            </AnimatePresence>
          </motion.ol>
          <div className="onboard__foot">
            <Link to="/menu" className="btn btn--chalk">All {DRINKS.length} on the menu ›</Link>
            <p className="chalkline">
              On the boards: {priced.map((b, i) => (
                <span key={b.name}>
                  {i > 0 && ' · '}
                  {b.name} <span className="mono">£{b.price}</span>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="getting" aria-labelledby="getting-h">
          <h2 id="getting-h" className="getting__h">From the Tube</h2>
          <p className="getting__p">Left on Brixton Road, left onto Electric Avenue, right onto Electric Lane, then into Market Row.</p>
          <Link to="/find-us" className="getting__plan" aria-label="See the route to Unit 14, step by step">
            <MarketRowPlan compact />
          </Link>
        </section>

        <section className="room" aria-labelledby="room-h">
          <h2 id="room-h" className="room__h">{BAR.oneAndOnly}</h2>
          <div className="tiles">
            <figure className="tile tile--wide">
              <Photo photo={PHOTOS.counterNight} sizes="(min-width: 900px) 60vw, 100vw" />
              <figcaption>Steel counter, yellow stools, chalk up top.</figcaption>
            </figure>
            <figure className="tile">
              <Photo photo={PHOTOS.layeredShots} sizes="(min-width: 900px) 20vw, 50vw" />
              <figcaption>Layered and rimmed.</figcaption>
            </figure>
            <figure className="tile">
              <Photo photo={PHOTOS.noonTumbler} sizes="(min-width: 900px) 20vw, 50vw" />
              <figcaption>Noon, with the aisle going by.</figcaption>
            </figure>
          </div>
          <p className="room__p">{BAR.sorted}</p>
        </section>

        <section className="also" aria-labelledby="also-h">
            <h2 id="also-h" className="also__h">Also behind the bar</h2>
            <ul className="also__list">
              {ALSO_POURING.map((a) => (
                <li key={a.title} className={a.moments.includes(moment) ? 'is-fit' : undefined}>
                  <strong>{a.title}</strong> <span>{a.detail}</span>
                </li>
              ))}
            </ul>
        </section>

        <section className="crowd" aria-labelledby="crowd-h">
          <div className="crowd__text">
            <p className="eyebrow eyebrow--light">Birthdays, big tables, a round for everyone</p>
            <h2 id="crowd-h" className="crowd__h">Bringing a crowd?</h2>
            <p className="crowd__p">{BAR.walkIn} If there’ll be a lot of you, give us a heads-up first.</p>
            <Link to="/groups" className="btn btn--white">Send a heads-up</Link>
          </div>
          <Photo photo={PHOTOS.barStaff} sizes="(min-width: 900px) 30vw, 60vw" className="crowd__photo" />
        </section>
      </main>
    </>
  );
}
