import { IconCircleCheck, IconPencil, IconTrash } from '@tabler/icons-react'

const PRIORITY_LABELS = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Urgent',
}

function TaskCard({ task, isDone, onEdit, onDelete }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id)
  }

  return (
    <article
      className={`cardTask cardTask--${task.priority}`}
      draggable
      onDragStart={handleDragStart}
      onClick={onEdit}
    >
      <div className="card-header">
        <span>
          <i />
          {isDone ? 'Complété' : PRIORITY_LABELS[task.priority]}
        </span>
        <div className="d-flex justify-content-end">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onEdit() }}
          aria-label="Modifier"
        >
          <IconPencil size={16} stroke={1.75} />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          aria-label="Supprimer"
        >
          <IconTrash size={16} stroke={1.75} />
        </button>
        </div>
      </div>
      <div className="card-body">
        {task.image && <img src={task.image} alt="" />}
        <h5>
          {isDone && <IconCircleCheck size={18} stroke={1.75} />}
          <span>{task.title}</span>
        </h5>
        {task.description && <p>{task.description}</p>}
      </div>
    </article>
  )
}
export default TaskCard
