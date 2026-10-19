// The glass-and-bolt mark from the header of their /menu page.
export function LogoMark({ className, colour = '#00d9ff' }: { className?: string; colour?: string }) {
  return (
    <svg className={className} viewBox="30 105 140 170" aria-hidden="true">
      <path d="M100 130 L90 180 L110 180 L100 230" stroke={colour} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M100 230 L135 230 L160 110 L40 110 L65 250 L140 250" stroke={colour} strokeWidth="10" fill="none" />
      <path d="M66 259 L135 259" stroke={colour} strokeWidth="10" strokeLinecap="square" fill="none" />
    </svg>
  );
}

/** Just the bolt, for route markers and fit badges. */
export function Bolt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 32" aria-hidden="true">
      <path d="M14.5 1 4 18h7.5L9 31 20 13h-7.6z" fill="currentColor" />
    </svg>
  );
}
