import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Drink } from '../data/bar';
import { Bolt } from '../brand/LogoMark';
import { Glass, settle } from './Glass';

export function buildLine(d: Drink) {
  return [...settle(d)].reverse().map((l) => l.name).join(' · ');
}

export function DrinkRow({ drink, hot }: { drink: Drink; hot: boolean }) {
  return (
    <motion.li layout="position" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="drink">
      <Link to={`/drinks/${drink.slug}`} className="drink__link">
        <Glass drink={drink} className="drink__glass" />
        <span className="drink__text">
          <span className="drink__name">
            {drink.name}
            {hot && (
              <span className="drink__hot" title="Suits the moment">
                <Bolt className="drink__bolt" />
                <span className="sr-only">Suits the moment</span>
              </span>
            )}
          </span>
          <span className="drink__build">{buildLine(drink)}</span>
        </span>
        <span className="drink__chev" aria-hidden="true">›</span>
      </Link>
    </motion.li>
  );
}
