import React, {useState, useEffect} from 'react'
import './CategoryForm.scss'

const CategoryForm = (props) => {
    console.log('form new category', props.createdCategory)
    
    const [formData, setFormData] = useState(props.selectedQuestion)

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
                  <div className="btn-div">
					<input type='submit' value={props.label} className="button" to='/customquestion'/>
					{/* <input type='submit' value='Update' className="button"/> */}
				</div>
            </form>
            <form>
                {/* <input
                    className="question"
                    type="text"
                    name="quiz_question"
                    value="UPDATE"
                    placeholder="Question"
                    onChange="UPDATE"
                />

                <input
                    className="input-1"
                    type="text"
                    name="correct_answer"
                    value="UPDATE"
                    placeholder="Correct Answer"
                    onChange="UPDATE"
                />
                <input
                    className="input-2"
                    type="text"
                    name="incorrect_answer_1"
                    value="UPDATE"
                    placeholder="Other choice"
                    onChange="UPDATE"
                />
                <input
                    className="input-2"
                    type="text"
                    name="incorrect_answer_2"
                    value="UPDATE"
                    placeholder="Other choice"
                    onChange="UPDATE"
                />
                <input
                    className="input-3"
                    type="text"
                    name="incorrect_answer_3"
                    value="UPDATE"
                    placeholder="Other choice"
                    onChange="UPDATE"
                /> */}
            </form>
        </div>
    )
}
export default CategoryForm