import React, { useState } from 'react'

import CategoryList from './CategoryList'

const AddCategory = () => {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(window.confirm(`Are you sure you want to add the category ${name}?`)) {
      const headers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ category: name, sets: [] })
      }
      fetch('/api/category', headers)
        .then(data => window.location.reload())
    }
  }

  return (
    <div className="add-category-wrapper">
      <input type="text" name="name" onChange={(e) => setName(e.target.value)} />

      <input type="submit" value="Add Category" onClick={handleSubmit} />

      <CategoryList />
    </div>
  )
}
export default AddCategory
