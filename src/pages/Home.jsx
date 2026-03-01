import StatsBar from '../components/StatsBar'
import GameForm from '../components/GameForm'
import GameList from '../components/GameList'
import { useGames } from '../composables/useGames'

export default function Home() {
  const {
    filteredGames,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    stats,
    addGame,
    removeGame,
    updateRating,
    updateStatus,
  } = useGames()

  return (
    <main className="main-content">
      <div className="container">
        <StatsBar stats={stats} />
        <GameForm onAddGame={addGame} />
        <GameList
          filteredGames={filteredGames}
          filterStatus={filterStatus}
          searchQuery={searchQuery}
          onFilterChange={setFilterStatus}
          onSearchChange={setSearchQuery}
          onRemove={removeGame}
          onRate={updateRating}
          onStatusChange={updateStatus}
        />
      </div>
    </main>
  )
}
