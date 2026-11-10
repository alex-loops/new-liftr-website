import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/zalando-sans-expanded/latin-400.css'
import '@fontsource/zalando-sans-expanded/latin-500.css'
import '@fontsource/zalando-sans-expanded/latin-600.css'
import './styles/index.css'
import { routes } from './routes'

// The hosted preview runs in a sandboxed frame without real URLs, so it
// keeps routes in memory; production uses normal browser history.
// Production pages arrive pre-rendered (scripts/prerender.mjs); the app
// renders over that HTML on load.
const makeRouter = import.meta.env.VITE_PREVIEW ? createMemoryRouter : createBrowserRouter
const router = makeRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
