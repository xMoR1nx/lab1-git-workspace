import { useState, useEffect } from 'react'
import posthog from 'posthog-js'

const TABS = [
  { value: 'all', label: '🎮 Всі' },
  { value: 'playing', label: '▶ Граю' },
  { value: 'completed', label: '✅ Пройшов' },
  { value: 'wishlist', label: '🔖 Вішліст' },
]

export default function GameList({
  filteredGames,
  filterStatus,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onRemove,
  onRate,
  onStatusChange,
}) {
  const [showUrgentFilter, setShowUrgentFilter] = useState(false)

  useEffect(() => {
    // Feature Flag: показуємо кнопку тільки якщо прапорець увімкнений
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled('show-urgent-filter')) {
        setShowUrgentFilter(true)
      } else {
        setShowUrgentFilter(false)
      }
    })
  }, [])

  function handleRemove(game) {
    posthog.capture('game_deleted', {
      platform: game.platform,
      genre: game.genre,
      status: game.status,
    })
    onRemove(game.id)
  }

  function handleStatusChange(game, newStatus) {
    if (newStatus === 'completed') {
      posthog.capture('game_completed', {
        platform: game.platform,
        genre: game.genre,
        rating: game.rating,
      })
    }
    onStatusChange(game.id, newStatus)
  }

  return (
    <div className="games-section">
      <div className="games-toolbar">
        <h2 className="section-title">🗂 Моя бібліотека ({filteredGames.length})</h2>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          placeholder="🔍 Пошук гри..."
        />
        <div className="filter-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`filter-tab ${filterStatus === tab.value ? 'active' : ''}`}
              onClick={() => onFilterChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}

          {/* Feature Flag: кнопка показується тільки якщо прапорець увімкнений */}
          {showUrgentFilter && (
            <button
              className={`filter-tab ${filterStatus === 'urgent' ? 'active' : ''}`}
              onClick={() => onFilterChange('urgent')}
            >
              🔥 Термінові
            </button>
          )}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="empty-state">
          <p>🎮 Ігор не знайдено. Додайте першу!</p>
        </div>
      ) : (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className={`game-card status-${game.status}`}>
              <div className="game-card-top">
                <span className="game-platform">{game.platform}</span>
                <button className="btn-remove" onClick={() => handleRemove(game)}>✕</button>
              </div>
              <h3 className="game-title">{game.title}</h3>
              <span className="game-genre">{game.genre}</span>
              <div className="game-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`star-btn ${star <= game.rating ? 'filled' : ''}`}
                    onClick={() => onRate(game.id, star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="game-footer">
                <select
                  value={game.status}
                  className="status-select"
                  onChange={(e) => handleStatusChange(game, e.target.value)}
                >
                  <option value="playing">▶ Граю</option>
                  <option value="completed">✅ Пройшов</option>
                  <option value="wishlist">🔖 Вішліст</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}