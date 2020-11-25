import React, {useState} from 'react'
import './QuestionForm.scss'

const QuestionForm = (props) => {
    console.log('question form props', props)
    
    const [formData, setFormData] = useState(props.selectedQuestion)
    // const [state, setState] = useState()

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({...formData, [key]: value, "category_id": props.createdCategory.id, "user_answer": "incorrect"})
        console.log('formData', formData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
    }

    

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        setFormData({
            itemvalues: [{}]
        });
    };

    return(
        <div className="create-question">
            <div>Add questions for your category</div>
            <div className="created-cat">{props.createdCategory.name}</div>
            <form className="question-form" onSubmit={handleSubmit}>
                <input
                    className="quiz-question"
                    type="text"
                    name="quiz_question"
                    value={formData.quiz_question}
                    placeholder="?"
                    onChange={handleChange}
                />
                <input
                    className="correct-answer"
                    type="text"
                    name="correct_answer"
                    value={formData.correct_answer}
                    placeholder="answer"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_1"
                    value={formData.incorrect_answer_1}
                    placeholder="1"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_2"
                    value={formData.incorrect_answer_2}
                    placeholder="2"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_3"
                    value={formData.incorrect_answer_3}
                    placeholder="3"
                    onChange={handleChange}
                />
                <div className="btn-div">
					<input type='submit' value={props.label} className="button" to='/customlist'/>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </form>
            
        </div>
    )
}
export default QuestionForm