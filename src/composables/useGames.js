import { useState } from 'react'

const STORAGE_KEY = 'gametracker_games'

function loadGames() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveGames(games) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
}

export function useGames() {
  const [games, setGames] = useState(loadGames)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  function addGame(gameData) {
    const newGame = {
      id: Date.now(),
      title: gameData.title,
      genre: gameData.genre,
      status: gameData.status,
      rating: 0,
      platform: gameData.platform,
      addedAt: new Date().toISOString(),
    }
    const updated = [...games, newGame]
    setGames(updated)
    saveGames(updated)
  }

  function removeGame(id) {
    const updated = games.filter((g) => g.id !== id)
    setGames(updated)
    saveGames(updated)
  }

  function updateRating(id, rating) {
    const updated = games.map((g) => (g.id === id ? { ...g, rating } : g))
    setGames(updated)
    saveGames(updated)
  }

  function updateStatus(id, status) {
    const updated = games.map((g) => (g.id === id ? { ...g, status } : g))
    setGames(updated)
    saveGames(updated)
  }

  const filteredGames = games.filter((game) => {
    const matchesStatus = filterStatus === 'all' || game.status === filterStatus
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: games.length,
    playing: games.filter((g) => g.status === 'playing').length,
    completed: games.filter((g) => g.status === 'completed').length,
    wishlist: games.filter((g) => g.status === 'wishlist').length,
  }

  return {
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
  }
}
