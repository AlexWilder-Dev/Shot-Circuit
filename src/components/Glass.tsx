import { useId, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Drink, Glass as GlassType, Layer } from '../data/bar';

// Glass shapes follow the bar's own mark: a tapered shot glass with a thick base.
const GEOM: Record<GlassType, { top: number; bottom: number; topL: number; topR: number; botL: number; botR: number; floor: number; cap: number }> = {
  single: { top: 36, bottom: 104, topL: 21, topR: 79, botL: 29, botR: 71, floor: 95, cap: 50 },
  double: { top: 10, bottom: 104, topL: 14, topR: 86, botL: 27, botR: 73, floor: 94, cap: 90 },
  tumbler: { top: 32, bottom: 104, topL: 8, topR: 92, botL: 15, botR: 85, floor: 98, cap: 150 },
};

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// Near-white spirits (vodka, gin, tequila…) are clear in the glass; creams and sorbet are not.
const isClear = (l: Layer) => luminance(l.colour) > 0.9 && !/cream|baileys|sorbet/i.test(l.name);

/** Layers bottom-up: 'auto' settles by density, 'manual' is poured in order. */
export function settle(drink: Drink): Layer[] {
  if (drink.pour === 'manual') return drink.layers;
  return drink.layers.map((l, i) => ({ l, i })).sort((a, b) => b.l.density - a.l.density || a.i - b.i).map((x) => x.l);
}

function blend(layers: Layer[]): Layer {
  const total = layers.reduce((s, l) => s + l.ml, 0);
  const rgb = [0, 1, 2].map((k) => Math.round(layers.reduce((s, l) => s + hexToRgb(l.colour)[k] * l.ml, 0) / total));
  const colour = '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
  return { name: 'mixed', ml: total, colour, opacity: 0.92, density: 1 };
}

type Props = {
  drink: Drink;
  className?: string;
  /** Pour when scrolled into view (rows) or straight away (sheet). */
  pour?: 'inView' | 'mount' | 'none';
  bolt?: boolean;
  speed?: number;
};

export function Glass({ drink, className, pour = 'inView', bolt = false, speed = 1 }: Props) {
  const uid = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const animated = pour !== 'none' && !reduce;
  const go = pour === 'mount' || inView;

  const g = GEOM[drink.glass];
  const layers = drink.mixed ? [blend(drink.layers)] : settle(drink);
  const totalMl = layers.reduce((s, l) => s + l.ml, 0);
  const innerTop = g.top + 2;
  const innerH = g.floor - innerTop;
  const fillH = Math.min(0.9, totalMl / g.cap) * innerH;
  const surface = g.floor - fillH;

  let y = g.floor;
  const rects = layers.map((l) => {
    const h = (l.ml / totalMl) * fillH;
    y -= h;
    return { l, y, h };
  });

  const boltTime = bolt && animated ? 0.45 / speed : 0;
  const step = 0.42 / speed;
  const pourEnd = boltTime + rects.length * step;

  // x at a given y along each wall, for placing garnish on the surface.
  const wallX = (yy: number, side: 'L' | 'R') => {
    const t = (yy - g.top) / (g.bottom - g.top);
    return side === 'L' ? g.topL + (g.botL - g.topL) * t : g.topR + (g.botR - g.topR) * t;
  };

  const ids = new Set(drink.garnish.map((x) => x.id));
  const cx = 50;

  return (
    <svg ref={ref} className={className} viewBox="0 -22 100 140" role="img" aria-label={`${drink.name} in a ${drink.glass === 'tumbler' ? 'tumbler' : drink.glass + ' shot glass'}`}>
      <defs>
        <clipPath id={`in-${uid}`}>
          <polygon points={`${g.topL + 2.4},${innerTop} ${g.topR - 2.4},${innerTop} ${wallX(g.floor, 'R') - 2},${g.floor} ${wallX(g.floor, 'L') + 2},${g.floor}`} />
        </clipPath>
      </defs>

      <g clipPath={`url(#in-${uid})`}>
        {rects.map(({ l, y: ly, h }, i) => {
          const clear = isClear(l);
          return (
            <motion.rect
              key={l.name + i}
              x={0}
              width={100}
              y={ly}
              height={h + 0.6}
              fill={clear ? '#e9f2ff' : l.colour}
              fillOpacity={clear ? 0.26 : l.opacity}
              style={{ transformBox: 'fill-box', originX: 0.5, originY: 1 }}
              initial={animated ? { scaleY: 0 } : false}
              animate={go ? { scaleY: 1 } : undefined}
              transition={{ delay: boltTime + i * step, duration: step * 1.05, ease: [0.3, 0.6, 0.4, 1] }}
            />
          );
        })}
        {/* meniscus */}
        <motion.rect
          x={0}
          width={100}
          y={surface - 0.4}
          height={1.4}
          fill="#fff"
          fillOpacity={0.45}
          initial={animated ? { opacity: 0 } : false}
          animate={go ? { opacity: 1 } : undefined}
          transition={{ delay: pourEnd, duration: 0.3 }}
        />
      </g>

      {bolt && (
        <motion.path
          d={`M${cx + 3} ${innerTop - 18} L${cx - 6} ${(innerTop + g.floor) / 2} L${cx + 6} ${(innerTop + g.floor) / 2} L${cx - 2} ${g.floor - 4}`}
          fill="none"
          stroke="#00d9ff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0, opacity: 1 } : { opacity: 0 }}
          animate={go && animated ? { pathLength: [0, 1, 1], opacity: [1, 1, 0] } : undefined}
          transition={{ duration: boltTime + step, times: [0, 0.45, 1], ease: 'easeOut' }}
        />
      )}

      {/* glass: rim, walls, thick base, foot (after their logo mark) */}
      <g fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round">
        <path d={`M${g.topL} ${g.top} L${g.botL} ${g.bottom} L${g.botR} ${g.bottom} L${g.topR} ${g.top} Z`} />
        <path d={`M${wallX(g.floor, 'L') + 1.5} ${g.floor} L${wallX(g.floor, 'R') - 1.5} ${g.floor}`} strokeOpacity={0.55} />
        <path d={`M${g.botL + 1} ${g.bottom + 6} L${g.botR - 1} ${g.bottom + 6}`} />
      </g>
      <path d={`M${g.topL + 6} ${g.top + 6} L${g.botL + 4.5} ${g.bottom - 14}`} stroke="#fff" strokeOpacity={0.28} strokeWidth={1.6} strokeLinecap="round" />

      <motion.g
        initial={animated ? { opacity: 0, y: -4 } : false}
        animate={go ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: pourEnd + 0.05, duration: 0.35 }}
      >
        {(ids.has('sugar-rim') || ids.has('salt-rim')) && (
          <path d={`M${g.topL - 0.5} ${g.top - 1.2} L${g.topR + 0.5} ${g.top - 1.2}`} stroke="#fff" strokeWidth={3.6} strokeDasharray="0.1 2.4" strokeLinecap="round" />
        )}
        {(ids.has('lemon-wheel') || ids.has('lemon-wedge') || ids.has('lime-wedge')) && (
          <g transform={`translate(${g.topR - 7} ${g.top}) rotate(-28)`}>
            <path d="M-10 0 A10 10 0 0 1 10 0 Z" fill={ids.has('lime-wedge') ? '#8cc63f' : '#f7d64a'} stroke={ids.has('lime-wedge') ? '#4e8a1e' : '#d9a915'} strokeWidth={1.4} />
            <path d="M0 0 L-6 -6 M0 0 L0 -8 M0 0 L6 -6" stroke="#fff" strokeOpacity={0.7} strokeWidth={1} />
          </g>
        )}
        {ids.has('star-fruit') && (
          <path
            transform={`translate(${g.topR - 6} ${g.top - 6})`}
            d="M0 -9 L2.6 -3 L9 -2.8 L4 1.4 L5.6 8 L0 4.4 L-5.6 8 L-4 1.4 L-9 -2.8 L-2.6 -3 Z"
            fill="#f2d33c"
            stroke="#c9a10f"
            strokeWidth={1}
          />
        )}
        {ids.has('cherry') && (
          <g transform={`translate(${g.topR - 9} ${g.top - 4})`}>
            <path d="M0 -2 C2 -9 6 -12 10 -14" stroke="#5d7a2a" strokeWidth={1.4} fill="none" />
            <circle r={5} fill="#d1162c" />
            <circle cx={-1.6} cy={-1.6} r={1.3} fill="#fff" fillOpacity={0.6} />
          </g>
        )}
        {ids.has('whipped-cream') && (
          <path
            d={`M${g.topL + 3} ${g.top + 1} C${g.topL + 2} ${g.top - 8} ${g.topL + 14} ${g.top - 10} ${cx - 10} ${g.top - 9} C${cx - 6} ${g.top - 17} ${cx + 8} ${g.top - 17} ${cx + 10} ${g.top - 9} C${g.topR - 14} ${g.top - 10} ${g.topR - 2} ${g.top - 8} ${g.topR - 3} ${g.top + 1} Z`}
            fill="#fbf6ee"
          />
        )}
        {ids.has('chocolate-shavings') && (
          <path d={`M${cx - 12} ${g.top - 6} l3 -1 M${cx - 3} ${g.top - 10} l3 1 M${cx + 6} ${g.top - 6} l3 -1.5 M${cx + 1} ${g.top - 4} l2.5 1`} stroke="#4b2a18" strokeWidth={1.8} strokeLinecap="round" />
        )}
        {ids.has('coffee-beans') && (
          <g fill="#3a2414">
            {[-9, 0, 9].map((dx, i) => (
              <g key={i} transform={`translate(${cx + dx} ${surface - 1.6}) rotate(${i * 35 - 20})`}>
                <ellipse rx={3.6} ry={2.4} />
                <path d="M-2.6 0 Q0 -1 2.6 0" stroke="#7a5236" strokeWidth={0.7} fill="none" />
              </g>
            ))}
          </g>
        )}
        {ids.has('marshmallow') && <rect x={g.topL + 4} y={g.top - 9} width={10} height={9} rx={3} fill="#fff4f6" stroke="#f2c7d0" strokeWidth={1} transform={`rotate(-12 ${g.topL + 9} ${g.top - 4})`} />}
        {ids.has('gummy') && <rect x={g.topL - 1} y={g.top - 9} width={9} height={10} rx={4} fill="#ff5c8a" transform={`rotate(-18 ${g.topL + 3} ${g.top - 4})`} />}
        {ids.has('lemon-zest') && (
          <path d={`M${g.topR - 18} ${g.top - 2} c4 -10 10 -2 6 -8 s6 -6 8 -12`} stroke="#f7d64a" strokeWidth={2.4} strokeLinecap="round" fill="none" />
        )}
        {ids.has('celery') && (
          <g>
            <path d={`M${cx + 6} ${surface + 10} L${g.topR + 2} ${g.top - 19}`} stroke="#8bbf4a" strokeWidth={5} strokeLinecap="round" />
            <path d={`M${g.topR + 2} ${g.top - 19} l5 -3 M${g.topR + 2} ${g.top - 19} l-1 -6 M${g.topR + 2} ${g.top - 19} l6 2`} stroke="#5e9a2c" strokeWidth={2} strokeLinecap="round" />
          </g>
        )}
        {ids.has('olive') && (
          <g>
            <path d={`M${g.topL + 6} ${g.top - 18} L${cx - 2} ${surface + 6}`} stroke="#d9b98a" strokeWidth={1.6} strokeLinecap="round" />
            <ellipse cx={g.topL + 15} cy={g.top - 4} rx={5.2} ry={4.4} fill="#7c9a2e" stroke="#4f6a16" strokeWidth={1} />
            <circle cx={g.topL + 16.5} cy={g.top - 4.5} r={1.5} fill="#c8362c" />
          </g>
        )}
      </motion.g>
    </svg>
  );
}
