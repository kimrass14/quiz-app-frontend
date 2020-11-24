import React, {useState, useEffect} from 'react'
import './QuestionForm.scss'

const QuestionForm = (props) => {
    console.log('question form props', props)
    
    const [formData, setFormData] = useState(props.selectedQuestion)
    const [state, setState] = useState()

    // useEffect(() => {
        
    // }, [props.createdCategory.id])

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
            <div>Add your own question here</div>
            <div>{props.createdCategory.name}</div>
            <form id="question-form" onSubmit={handleSubmit}>
                <input
                    className="quiz-question"
                    type="text"
                    name="quiz_question"
                    value={formData.quiz_question}
                    placeholder="Question"
                    onChange={handleChange}
                />
                <input
                    className="correct-answer"
                    type="text"
                    name="correct_answer"
                    value={formData.correct_answer}
                    placeholder="Correct answer"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_1"
                    value={formData.incorrect_answer_1}
                    placeholder="Multiple choice"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_2"
                    value={formData.incorrect_answer_2}
                    placeholder="Multiple choice"
                    onChange={handleChange}
                />
                <input
                    className="multiple-choice"
                    type="text"
                    name="incorrect_answer_3"
                    value={formData.incorrect_answer_3}
                    placeholder="Multiple choice"
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