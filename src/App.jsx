import { useState } from 'react'

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [inputText, setInputText] = useState('')

  function addTask() {
    const text = inputText.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextId++, text, completed: false }])
    setInputText('')
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1 className="title">タスクボード</h1>

      <div className="input-row">
        <input
          className="task-input"
          type="text"
          placeholder="タスクを入力..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません。追加してみましょう！</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label="タスクを削除"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <p className="summary">
          {tasks.filter(t => t.completed).length} / {tasks.length} 件完了
        </p>
      )}
    </div>
  )
}
