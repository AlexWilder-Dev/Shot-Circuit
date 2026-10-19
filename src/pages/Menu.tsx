import { useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ALSO_POURING, BOARD, DRINKS, PHOTOS } from '../data/bar';
import { Fascia } from '../components/Fascia';
import { StatusStrip } from '../components/StatusStrip';
import { MomentPicker } from '../components/MomentPicker';
import { DrinkRow } from '../components/DrinkRow';
import { DrinkSheet } from '../components/DrinkSheet';
import { Photo } from '../components/Photo';
import { useMoment } from '../lib/state';
import { rankSections, score } from '../lib/moments';

export function Menu() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { moment } = useMoment();
  const sections = rankSections(moment);
  const topFit = Math.max(...sections.map((s) => s.best));
  const open = DRINKS.find((d) => d.slug === slug);

  const close = useCallback(() => {
    if (location.key !== 'default' && window.history.length > 1) navigate(-1);
    else navigate('/menu', { replace: true });
  }, [location.key, navigate]);

  return (
    <>
      <Fascia compact />
      <StatusStrip />
      <main id="main" tabIndex={-1} className="menu board">
        <header className="menu__head">
          <h1 className="menu__title">The shot list</h1>
          <p className="menu__sub">Shooters, shots, sips and (un)wellness. Tap a drink to see how it’s built.</p>
        </header>

        <MomentPicker sticky />

        <LayoutGroup>
          {sections.map(({ sec, drinks }) => (
            <motion.section key={sec.id} layout="position" className="menu__section" aria-labelledby={`sec-${sec.id}`}>
              <div className="menu__sechead">
                <h2 id={`sec-${sec.id}`} className="menu__sectitle">{sec.title}</h2>
                <p className="menu__secblurb">{sec.blurb}</p>
              </div>
              <ol className="drinks">
                <AnimatePresence initial={false}>
                  {drinks.map(({ drink, fit }) => (
                    <DrinkRow key={drink.slug} drink={drink} hot={fit > 0 && fit === topFit} />
                  ))}
                </AnimatePresence>
              </ol>
            </motion.section>
          ))}
        </LayoutGroup>

        <section className="menu__section chalkboard" aria-labelledby="sec-board">
          <div className="menu__sechead">
            <h2 id="sec-board" className="menu__sectitle">Chalked up at the bar</h2>
            <p className="menu__secblurb">Off the boards over the counter. Prices are on the boards at the bar.</p>
          </div>
          <div className="chalkboard__grid">
            <ul className="chalkboard__list">
              {[...BOARD]
                .map((b, i) => ({ b, i, s: score(b.tags, moment) }))
                .sort((x, y) => y.s - x.s || x.i - y.i)
                .map(({ b, s }) => (
                  <motion.li layout="position" key={b.name} className={'chalkboard__item' + (s >= 2 ? ' is-fit' : '')}>
                    <span className="chalkboard__name">
                      {b.link ? <Link to={`/drinks/${b.link}`}>{b.name}</Link> : b.name}
                    </span>
                    {b.build && <span className="chalkboard__build">{b.build}</span>}
                    {b.price && <span className="chalkboard__price mono">£{b.price}</span>}
                  </motion.li>
                ))}
            </ul>
            <figure className="chalkboard__photo">
              <Photo photo={PHOTOS.layeredShots} sizes="(min-width: 900px) 280px, 40vw" />
              <figcaption>Sugar-rimmed and layered on the steel.</figcaption>
            </figure>
          </div>
        </section>

        <section className="menu__section" aria-labelledby="sec-also">
          <div className="menu__sechead">
            <h2 id="sec-also" className="menu__sectitle">Also behind the bar</h2>
            <p className="menu__secblurb">Ask at the counter for what’s on.</p>
          </div>
          <ul className="also__list also__list--board">
            {ALSO_POURING.map((a) => (
              <li key={a.title} className={a.moments.includes(moment) ? 'is-fit' : undefined}>
                <strong>{a.title}</strong> <span>{a.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <AnimatePresence>{open && <DrinkSheet key="sheet" drink={open} onClose={close} />}</AnimatePresence>
    </>
  );
}
