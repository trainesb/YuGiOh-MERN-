import React, { useState, useEffect } from 'react'

import { getAllCategories } from '../../services/CategoryServices'

const CategoryList = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories().then(cats => setCategories(cats))
  }, [])

  return (
    <ul className="category-list-wrapper">
      {categories.length > 0 &&
        categories.map((category) => <li className="category-list-item">{category.category}</li>)
      }
    </ul>
  )
}
export default CategoryList
