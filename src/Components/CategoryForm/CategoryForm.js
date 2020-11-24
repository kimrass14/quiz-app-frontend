import React, {useState, useEffect} from 'react'
import {Link, route} from 'react-router-dom'
import './CategoryForm.scss'

const CategoryForm = (props) => {
    console.log('form new category', props.createdCategory)
    
    const [formData, setFormData] = useState(props.selectedCategory)

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({...formData, [key]: value, "created": "custom"})
        console.log('formData', formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        
    }

    return(
        <div className="category-form">
            <div>Form</div>
            <form id="cat-form" onSubmit={handleSubmit}>
                <input
                    className="category"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Category name"
                    onChange={handleChange}
                />
                  <div className="btn-div"><input type='submit' value={props.label} className="button" onClick={() => {props.history.push(props.route)}}/></div>
            </form>
        </div>
    )
}
export default CategoryForm