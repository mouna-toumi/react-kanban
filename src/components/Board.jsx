import Column from './Column'

function Board({ columns, tasks, onMoveTask, onEditTask, onDeleteTask, onAddTask }) {
  return (
    <div className="board">
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          tasks={tasks.filter(t => t.status === col.id)}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  )
}
export default Board
