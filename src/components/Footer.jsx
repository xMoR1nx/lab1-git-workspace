export default function Footer() {
  const appName = import.meta.env.VITE_APP_NAME || 'GameTracker'
  const appVersion = import.meta.env.VITE_APP_VERSION || '0.1.0'
  const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'

  return (
    <footer className="app-footer">
      <p>
        {appName} v{appVersion} &mdash; <span className="footer-env">{appStatus}</span>
      </p>
      <p className="footer-copy">© 2026 Козак М.В. | ПП-32-1 | Управління ІТ-проєктами</p>
    </footer>
  )
}
