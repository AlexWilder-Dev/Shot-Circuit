import { motion, useReducedMotion } from 'framer-motion';
import { WORDMARK } from './wordmark';

type Props = { className?: string; animate?: boolean; title?: string };

/**
 * SHOT reads forwards; CIRCUI is mirrored and hangs off the T, as on the fascia.
 * On first paint CIRCUI reads the normal way, then flips back to close the loop.
 */
export function Wordmark({ className, animate = false, title = 'Shot Circuit' }: Props) {
  const reduce = useReducedMotion();
  const flip = animate && !reduce;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path d={WORDMARK.shot} />
      <motion.path
        d={WORDMARK.circui}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={flip ? { scaleX: -1 } : false}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
      />
    </svg>
  );
}
