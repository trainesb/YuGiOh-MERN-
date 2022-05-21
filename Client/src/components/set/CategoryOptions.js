import React from 'react'



const CategoryOptions = (props) => {

  const handleChange = (event) => {
    event.preventDefault();

    console.log('Set Id: ' + props.setId)
    console.log('Category Id: ' + event.target.value)

    const headers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ id: props.setId, category_id: event.target.value })
    }
    fetch('/api/set/category', headers)
  }

  return (
    <select className="category-option-wrapper" onChange={handleChange}>
      {props.category_id !== null && props.categories.length > 0
        ? <option className="category-option-item" value={props.category_id} label={props.categories.find((el) => { return el._id === props.category_id; }).category} />
        : <option className="category-option-item" value="" label="--SELECT--" />
      }

      {props.categories.length > 0 &&
        props.categories.map((category) => category._id !== props.category_id && <option className="category-option-item" value={category._id} label={category.category} />)
      }
    </select>
  )
}
export default CategoryOptions
