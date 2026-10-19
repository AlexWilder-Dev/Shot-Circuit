import { londonNow, hoursRows } from '../lib/hours';
import { useNow } from '../lib/state';

export function HoursTable({ className = '' }: { className?: string }) {
  const now = useNow();
  const { day } = londonNow(now);
  return (
    <table className={'hours ' + className}>
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {hoursRows().map((r) => (
          <tr key={r.label} className={r.days.includes(day) ? 'is-today' : undefined}>
            <th scope="row">{r.label}</th>
            <td>{r.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
