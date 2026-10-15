import { useState } from 'react'
import { IconCircleFilled, IconCirclePlus, IconPlus } from '@tabler/icons-react'
import TaskCard from './TaskCard'

function Column({ column, tasks, onMoveTask, onEditTask, onDeleteTask, onAddTask }) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOver(false)
    }
  }

  const handleDrop = (e) => {
    const taskId = Number(e.dataTransfer.getData('taskId'))
    onMoveTask(taskId, column.id)
    setIsOver(false)
  }

  return (
    <div
      className={`cardColumn cardColumn--${column.id}${isOver ? ' is-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="card-header">
        <h5>
          <IconCircleFilled size={10} />
          {column.label}
        </h5>
        <span>{tasks.length}</span>
        <button type="button" onClick={onAddTask} title="Ajouter une tâche">
          <IconPlus size={20} stroke={1.75} />
        </button>
      </div>
      <div className="card-body">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isDone={column.id === 'done'}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
        <button type="button" className="cardColumn-drop" onClick={onAddTask}>
          <IconCirclePlus size={18} stroke={1.75} />
          Déposer ou créer une tâche ici
        </button>
      </div>
    </div>
  )
}
export default Column
