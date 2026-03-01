export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">Всього ігор</span>
      </div>
      <div className="stat-item stat-playing">
        <span className="stat-num">{stats.playing}</span>
        <span className="stat-label">▶ Граю</span>
      </div>
      <div className="stat-item stat-completed">
        <span className="stat-num">{stats.completed}</span>
        <span className="stat-label">✅ Пройшов</span>
      </div>
      <div className="stat-item stat-wishlist">
        <span className="stat-num">{stats.wishlist}</span>
        <span className="stat-label">🔖 Вішліст</span>
      </div>
    </div>
  )
}
