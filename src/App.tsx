import { useEffect, useRef } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MomentProvider } from './lib/state';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { FindUs } from './pages/FindUs';
import { Groups } from './pages/Groups';
import { Footer } from './components/Footer';
import { ActionBar } from './components/ActionBar';

/** Back to the top on a new page, but not when a drink sheet opens over the menu. */
function ScrollManager() {
  const { pathname } = useLocation();
  const last = useRef(pathname);
  useEffect(() => {
    const sheet = (p: string) => p.startsWith('/drinks/') || p === '/menu';
    if (!(sheet(pathname) && sheet(last.current))) window.scrollTo(0, 0);
    last.current = pathname;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <MomentProvider>
        <ScrollManager />
        <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
          Skip to content
        </a>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/drinks/:slug" element={<Menu />} />
          <Route path="/find-us" element={<FindUs />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ActionBar />
      </MomentProvider>
    </HashRouter>
  );
}
