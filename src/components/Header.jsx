export default function Header() {
  const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'
  const isProduction = import.meta.env.PROD

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
      </div>
    </header>
  )
}
