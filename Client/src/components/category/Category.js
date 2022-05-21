import React, { useState } from 'react'

import AddCategory from './AddCategory'

const Category = () => {

  return (
    <div className="category-wrapper">
      <h1 className="title text-center">Categories</h1>

      <AddCategory />
    </div>
  )
}
export default Category
