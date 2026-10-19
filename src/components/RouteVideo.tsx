import { useState } from 'react';
import { BAR } from '../data/bar';
import { asset } from '../lib/state';

/** Their own "how to get here" video; nothing loads from YouTube until it's tapped. */
export function RouteVideo() {
  const [playing, setPlaying] = useState(false);
  const { id, title } = BAR.video;
  return (
    <figure className="video">
      <div className="video__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
            <img src={asset('photos/route-video-960.jpg')} alt="" width={960} height={540} loading="lazy" />
            <span className="video__play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="video__cap">“{title}”: from the Tube roundel to the Market Row arch and in to the counter.</figcaption>
    </figure>
  );
}
