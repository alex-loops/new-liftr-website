import type { RouteObject } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import MilestonePage from './pages/MilestonePage'
import CaseStudy from './pages/CaseStudy'
import LegalPage from './pages/LegalPage'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Shared by the browser router and the build-time pre-renderer. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'case-study', element: <CaseStudy /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <LegalPage key="privacy" kind="privacy" /> },
      { path: 'cookies', element: <LegalPage key="cookies" kind="cookies" /> },
      { path: '404', element: <NotFound /> },
      { path: ':slug', element: <MilestonePage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
