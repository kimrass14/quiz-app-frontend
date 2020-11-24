import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {Link, route} from 'react-router-dom'
import './CategoryForm.scss'

const CategoryForm = (props) => {
    console.log('form new category', props.createdCategory)
    
    const [formData, setFormData] = useState(props.selectedCategory)

    const loaded = props.categories.filter(category => category.created === "custom").map((customCategory, index) => {
        console.log('custom category', customCategory)

        return(
            <>
                <option value={customCategory} key={index}>{customCategory.name}</option>
                {/* <option value={customCategory} onChange={handleSelect}>{customCategory.name}</option> */}
            </>
        )
    })

    const handleSelect = (event) => {
        console.log('event', event)
    //VALUE IN OPTION TAG ISN'T BEING PASSED
        // const category = event.target.value
        // console.log('value', category)
    }

    const loading = () => {
        return(
            <div></div>
        )
    }

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({...formData, [key]: value, "created": "custom"})
        console.log('formData', formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        props.history.push(props.route)
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
                  <div className="btn-div"><input type='submit' value={props.label} className="button"/></div>
            </form>
            {props.categories ? 
                <div className="dropdown">
                    <label for="categories">Category</label>
                    <div>
                        <select id="categories" name="categories" onChange={handleSelect}>
                            {loaded}
                        </select>
                    </div>
                </div>
             : loading}
        </div>
    )
}
export default withRouter(CategoryForm)