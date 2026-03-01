// Додати нове завдання до списку
export function addTask(tasks, title, deadline) {
  if (!title || title.trim() === '') return null
  return [
    ...tasks,
    {
      id: Date.now(),
      title: title.trim(),
      deadline: deadline,
      completed: false
    }
  ]
}

// Видалити завдання за id
export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id)
}

// Перемкнути статус завдання
export function toggleTask(tasks, id) {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
}

// Скільки днів до дедлайну
export function getDaysUntilDeadline(deadline) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const diff = deadlineDate - today
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

// Фільтр тільки активних завдань
export function getActiveTasks(tasks) {
  return tasks.filter(task => !task.completed)
}

// Фільтр гарячих завдань (дедлайн <= 3 дні)
export function getHotTasks(tasks) {
  return tasks.filter(task => 
    !task.completed && getDaysUntilDeadline(task.deadline) <= 3
  )
}