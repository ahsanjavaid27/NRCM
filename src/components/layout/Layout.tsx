import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
