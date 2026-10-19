import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Schematic of Market Row traced from the OpenStreetMap footways: the main aisle runs
// from Electric Lane to Atlantic Road, with a short passage south to Coldharbour Lane.
// Unit 14 sits on that passage. Streets are simplified; the topology is real.
const ARCADE = 'M137 145 L217 146 L233 144 L280 134 L291 131 L314 107';
const PASSAGE = 'M217 146 L225 200';
const ROUTE = 'M34 46 L34 92 C70 93 104 95 137 96 L137 145 L213 146 L213 157';

export function MarketRowPlan({ compact = false }: { compact?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  return (
    <svg
      ref={ref}
      className={'plan' + (compact ? ' plan--compact' : '')}
      viewBox="0 0 360 250"
      role="img"
      aria-label="Plan of Market Row: from Brixton Tube go along Brixton Road, left onto Electric Avenue, right onto Electric Lane, into Market Row, then right towards Coldharbour Lane to Unit 14."
    >
      <g className="plan__streets" fill="none" strokeLinecap="round">
        <path d="M34 0 L34 250" />
        <path d="M34 92 C120 96 220 92 305 76" />
        <path d="M137 96 L137 205" />
        <path d="M34 206 L345 196" />
        <path d="M288 0 L352 250" />
      </g>

      <g className="plan__labels">
        <text x="26" y="170" transform="rotate(-90 26 170)">Brixton Road</text>
        <text x="170" y="86">Electric Avenue</text>
        <text x="129" y="196" transform="rotate(-90 129 196)">Electric Lane</text>
        <text x="58" y="222">Coldharbour Lane</text>
        <text x="331" y="168" transform="rotate(75 331 168)">Atlantic Road</text>
        {!compact && <text x="232" y="232" className="plan__muted">Brixton Village arcades ↓</text>}
      </g>

      <g className="plan__arcade" fill="none" strokeLinejoin="round" strokeLinecap="butt">
        <path d={ARCADE} />
        <path d={PASSAGE} />
      </g>
      <text className="plan__arcade-label" x="150" y="137">Market Row</text>

      {!compact && (
        <g className="plan__entrances">
          <text x="250" y="158">Atlantic Road</text>
          <text x="250" y="167">entrance ↗</text>
          <text x="232" y="181">Coldharbour Lane</text>
          <text x="232" y="190">entrance ↓</text>
        </g>
      )}

      <motion.path
        className="plan__route"
        d={ROUTE}
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
      />

      <g className="plan__tube" transform="translate(34 40)">
        <circle r="8" />
        <text x="13" y="4">Brixton Tube</text>
      </g>

      <motion.g
        className="plan__unit"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: reduce ? 0 : 2.3, type: 'spring', stiffness: 500, damping: 20 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <rect x="190" y="155" width="20" height="13" rx="1.5" />
        <path d="M201.6 157 L196.8 162.6 L200.2 162.6 L198.6 166.6 L203.8 160.6 L200.4 160.6 Z" className="plan__bolt" />
      </motion.g>
      <text className="plan__unit-label" x="186" y="164" textAnchor="end">Unit 14</text>
    </svg>
  );
}
