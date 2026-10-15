import { IconSearch } from '@tabler/icons-react'

function SearchBar({ value, onChange }) {
  return (
    <div className="searchBar">
      <div className="searchBar-field">
        <IconSearch size={18} stroke={1.75} />
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
export default SearchBar
