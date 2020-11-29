import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import './CategoryForm.scss'

const CategoryForm = (props) => {
    // console.log('form new category', props.createdCategory)
    
    const [formData, setFormData] = useState(props.selectedCategory)
    const [categoryToQsForm, setCategoryToQsForm] = useState([])
    console.log('category to question form', categoryToQsForm)

    const loaded = () => { return props.categories.filter(category => category.created === "custom").map((customCategory, index) => {
        // console.log('custom category', customCategory)

        return(
            <>
                <option value={[customCategory.id, customCategory.name]} key={index}>{customCategory.name}</option>
            </>
        )
    })
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

    


    const handleChangeDropDown = (e) => {
        console.log('handle change dropdown event', e)

        //unable to pass the category obj in the value property of the option tag
        //recreating the category object with id and name to pass to questions form
        const targetArr = e.target.value.split(",")
        const idInteger = parseInt(targetArr[0])
        const categoryObj = {"id": idInteger, "name": targetArr[1]}
        console.log('category object', categoryObj)

        setCategoryToQsForm(categoryObj)
        //({value: customCategory})
        //need to pass category object? since it it's already created.
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        props.history.push(props.route)
    }

    
    const handleSubmitDropDown = (event) => {
        event.preventDefault()
        props.handleSubmitCatToQ(categoryToQsForm)
        props.history.push(props.route)
        console.log('handle submit dropdown', event)
        //pass category from dropdown to a handlesubmit function in app that passes category (need name and id) to questions form
    }

    return(
        <div className="category-form">
            <h2>Create your own quiz</h2>
            <form id="cat-form" className="add-cat" onSubmit={handleSubmit}>
                <input
                    className="category"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="new category"
                    onChange={handleChange}
                />
                  <div className="btn-div"><input type='submit' value={props.label} className="button"/></div>
            </form>
            {props.categories ? 
                <form className="select-cat" onSubmit={handleSubmitDropDown}>
                    <label>Category you already created:    
                        <select value={categoryToQsForm[1]} onChange={handleChangeDropDown}>
                            <option value="option value">Select</option>
                            {loaded()}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
             : loading}
        </div>
    )
}
export default withRouter(CategoryForm)