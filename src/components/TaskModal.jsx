import { useState } from 'react'
import { IconCheck, IconFlag, IconNotes, IconPhoto, IconTypography, IconX } from '@tabler/icons-react'

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 640
        const scale = Math.min(1, max / img.width, max / img.height)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.75))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function TaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState(task?.priority || 'medium')
  const [image, setImage] = useState(task?.image || '')

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await readImageFile(file)
    setImage(dataUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title, description, priority, image })
  }

  return (
    <>
      <div className="taskModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</h5>
                <button type="button" onClick={onClose} aria-label="Fermer">
                  <IconX size={18} stroke={1.75} />
                </button>
              </div>
              <div className="modal-body">
                <label>
                  <IconTypography size={14} stroke={1.75} />
                  Titre
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label>
                  <IconNotes size={14} stroke={1.75} />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
                <label>
                  <IconPhoto size={14} stroke={1.75} />
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {image && (
                  <>
                    <img src={image} alt="Aperçu de la tâche" />
                    <button type="button" onClick={() => setImage('')}>
                      Retirer l’image
                    </button>
                  </>
                )}
                <label>
                  <IconFlag size={14} stroke={1.75} />
                  Priorité
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={onClose}>
                  <IconX size={16} stroke={1.75} />
                  Annuler
                </button>
                <button type="submit">
                  <IconCheck size={16} stroke={2} />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="taskModal-backdrop"></div>
    </>
  )
}
export default TaskModal
