import * as Sentry from '@sentry/react'

export default function Header() {
  const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'
  const isProduction = import.meta.env.PROD

  function throwError() {
  try {
    throw new Error(`Sentry Test Error #${Date.now()}`)
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error sent to Sentry:", error)
  }
}

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🎮</span>
          <div>
            <h1 className="header-title">GameTracker</h1>
            <p className="header-sub">My Personal Game Library</p>
          </div>
        </div>
        <span className={`env-badge ${isProduction ? 'badge-prod' : 'badge-dev'}`}>
          {appStatus}
        </span>
        <button
          onClick={throwError}
          style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
        >
          💥 Break the world
        </button>
      </div>
    </header>
  )
}