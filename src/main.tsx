import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/zalando-sans-expanded/latin-400.css'
import '@fontsource/zalando-sans-expanded/latin-500.css'
import './styles/index.css'
import App from './App'
import Home from './pages/Home'
import MilestonePage from './pages/MilestonePage'

// The hosted preview runs in a sandboxed frame without real URLs, so it
// keeps routes in memory; production uses normal browser history.
const makeRouter = import.meta.env.VITE_PREVIEW ? createMemoryRouter : createBrowserRouter
const router = makeRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: ':slug', element: <MilestonePage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
