import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/app.css'
import App from './App.jsx'
import { PostHogProvider } from '@posthog/react'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  environment: "development",
  sendDefaultPii: true,
})

// Встановлюю контекст користувача
Sentry.setUser({
  id: "12345",
  email: "marian.kozak.pp.2023@lpnu.ua",
  segment: "student_user",
})

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
)