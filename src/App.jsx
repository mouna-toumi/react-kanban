import { useState } from 'react'
import { IconLayoutKanban, IconPlus } from '@tabler/icons-react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Board from './components/Board'
import SearchBar from './components/SearchBar'
import TaskModal from './components/TaskModal'

const COLUMNS = [
  { id: 'todo', label: 'À faire' },
  { id: 'doing', label: 'En cours' },
  { id: 'done', label: 'Terminé' },
]

function App() {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', [])
  const [search, setSearch] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const openNewTaskModal = () => {
    setEditingTask(null)
    setShowModal(true)
  }

  const openEditTaskModal = (task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  const saveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t =>
        t.id === editingTask.id ? { ...t, ...taskData } : t
      ))
    } else {
      setTasks([...tasks, { id: Date.now(), status: 'todo', ...taskData }])
    }
    setShowModal(false)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="kanbanApp">
      <header>
        <div>
          <h1>
            <IconLayoutKanban size={24} stroke={1.75} />
            Tableau de tâches
          </h1>
          <p>{tasks.length} tâche{tasks.length > 1 ? 's' : ''} active{tasks.length > 1 ? 's' : ''}</p>
        </div>
        <button type="button" onClick={openNewTaskModal}>
          <IconPlus size={20} stroke={2} />
          Nouvelle tâche
        </button>
      </header>
      <SearchBar value={search} onChange={setSearch} />
      <Board
        columns={COLUMNS}
        tasks={filteredTasks}
        onMoveTask={moveTask}
        onEditTask={openEditTaskModal}
        onDeleteTask={deleteTask}
        onAddTask={openNewTaskModal}
      />
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={saveTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
export default App
