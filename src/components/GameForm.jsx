import { useState } from 'react'

const emptyForm = { title: '', platform: '', genre: '', status: '' }

export default function GameForm({ onAddGame }) {
  const [form, setForm] = useState(emptyForm)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.platform || !form.genre || !form.status) return
    onAddGame(form)
    setForm(emptyForm)
  }

  return (
    <div className="form-card">
      <h2 className="form-title">➕ Додати гру</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Назва гри</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Наприклад: Elden Ring"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Платформа</label>
            <select name="platform" value={form.platform} onChange={handleChange} className="form-input" required>
              <option value="" disabled>Оберіть платформу</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Жанр</label>
            <select name="genre" value={form.genre} onChange={handleChange} className="form-input" required>
              <option value="" disabled>Оберіть жанр</option>
              <option value="RPG">RPG</option>
              <option value="Action">Action</option>
              <option value="Strategy">Strategy</option>
              <option value="Shooter">Shooter</option>
              <option value="Adventure">Adventure</option>
              <option value="Sport">Sport</option>
              <option value="Horror">Horror</option>
              <option value="Indie">Indie</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Статус</label>
            <select name="status" value={form.status} onChange={handleChange} className="form-input" required>
              <option value="" disabled>Оберіть статус</option>
              <option value="playing">▶ Граю зараз</option>
              <option value="completed">✅ Пройшов</option>
              <option value="wishlist">🔖 Хочу зіграти</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary">Додати до бібліотеки</button>
      </form>
    </div>
  )
}
