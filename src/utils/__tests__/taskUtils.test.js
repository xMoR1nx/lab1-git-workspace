import { describe, it, expect } from 'vitest'
import {
  addTask,
  deleteTask,
  toggleTask,
  getDaysUntilDeadline,
  getActiveTasks,
  getHotTasks
} from '../taskUtils'

// ====== ТЕСТИ ДЛЯ addTask ======
describe('addTask', () => {

  it('додає нове завдання з правильними даними', () => {
    const result = addTask([], 'Здати лабу', '2026-03-01')
    expect(result.length).toBe(999)
    expect(result[0].title).toBe('Здати лабу')
    expect(result[0].completed).toBe(false)
  })

  it('не додає завдання з порожньою назвою', () => {
    const result = addTask([], '', '2026-03-01')
    expect(result).toBeNull()
  })

  it('не додає завдання з назвою з одних пробілів', () => {
    const result = addTask([], '   ', '2026-03-01')
    expect(result).toBeNull()
  })

  it('обрізає пробіли на початку і кінці назви', () => {
    const result = addTask([], '  Лаба  ', '2026-03-01')
    expect(result[0].title).toBe('Лаба')
  })

})

// ====== ТЕСТИ ДЛЯ deleteTask ======
describe('deleteTask', () => {

  it('видаляє завдання за id', () => {
    const tasks = [{ id: 1, title: 'Тест', completed: false }]
    const result = deleteTask(tasks, 1)
    expect(result.length).toBe(0)
  })

  it('не чіпає інші завдання при видаленні', () => {
    const tasks = [
      { id: 1, title: 'Перше', completed: false },
      { id: 2, title: 'Друге', completed: false }
    ]
    const result = deleteTask(tasks, 1)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(2)
  })

})

// ====== ТЕСТИ ДЛЯ toggleTask ======
describe('toggleTask', () => {

  it('перемикає completed з false на true', () => {
    const tasks = [{ id: 1, title: 'Тест', completed: false }]
    const result = toggleTask(tasks, 1)
    expect(result[0].completed).toBe(true)
  })

  it('перемикає completed з true на false', () => {
    const tasks = [{ id: 1, title: 'Тест', completed: true }]
    const result = toggleTask(tasks, 1)
    expect(result[0].completed).toBe(false)
  })

})

// ====== ТЕСТИ ДЛЯ getDaysUntilDeadline ======
describe('getDaysUntilDeadline', () => {

  it('повертає 0 якщо дедлайн сьогодні', () => {
    const today = new Date().toISOString().split('T')[0]
    expect(getDaysUntilDeadline(today)).toBe(0)
  })

  it('повертає негативне число якщо дедлайн минув', () => {
    expect(getDaysUntilDeadline('2020-01-01')).toBeLessThan(0)
  })

  it('повертає позитивне число для майбутньої дати', () => {
    expect(getDaysUntilDeadline('2030-01-01')).toBeGreaterThan(0)
  })

})

// ====== ТЕСТИ ДЛЯ getActiveTasks ======
describe('getActiveTasks', () => {

  it('повертає тільки незавершені завдання', () => {
    const tasks = [
      { id: 1, title: 'Активне', completed: false },
      { id: 2, title: 'Виконане', completed: true }
    ]
    const result = getActiveTasks(tasks)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(1)
  })

})

// ====== ТЕСТИ ДЛЯ getHotTasks ======
describe('getHotTasks', () => {

  it('повертає завдання з дедлайном <= 3 дні', () => {
    const today = new Date().toISOString().split('T')[0]
    const tasks = [
      { id: 1, title: 'Гаряче', completed: false, deadline: today },
      { id: 2, title: 'Не гаряче', completed: false, deadline: '2030-01-01' }
    ]
    const result = getHotTasks(tasks)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(1)
  })

  it('не включає виконані завдання', () => {
    const today = new Date().toISOString().split('T')[0]
    const tasks = [
      { id: 1, title: 'Виконане гаряче', completed: true, deadline: today }
    ]
    const result = getHotTasks(tasks)
    expect(result.length).toBe(0)
  })

})

// ====== ТЕСТИ З MOCK-ОБ'ЄКТАМИ ======
import { vi } from 'vitest'

describe('Mock-об\'єкти — ізоляція логіки', () => {

  it('викликає колбек після додавання завдання', () => {
    // Створюємо mock-функцію (імітацію)
    const onTaskAdded = vi.fn()

    const tasks = []
    const result = addTask(tasks, 'Нове завдання', '2026-03-01')
    
    // Імітуємо що колбек був викликаний
    if (result) onTaskAdded(result)

    // Перевіряємо що mock був викликаний рівно 1 раз
    expect(onTaskAdded).toHaveBeenCalledTimes(1)
  })

  it('не викликає колбек якщо завдання не додалось', () => {
    const onTaskAdded = vi.fn()

    const result = addTask([], '', '2026-03-01')
    if (result) onTaskAdded(result)

    // Mock не повинен бути викликаний бо result = null
    expect(onTaskAdded).not.toHaveBeenCalled()
  })

  it('mock перевіряє з якими аргументами був викликаний', () => {
    const onDelete = vi.fn()
   // const tasks = [{ id: 42, title: 'Тест', completed: false }]
    
    onDelete(42)

    // Перевіряємо що функція була викликана саме з id = 42
    expect(onDelete).toHaveBeenCalledWith(42)
  })

})