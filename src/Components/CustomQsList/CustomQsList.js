import React from 'react'
import {withRouter} from 'react-router-dom'
import './CustomQsList.scss'

const CustomQsList = (props) => {
    console.log('custom Q list props', props)

    const loaded = props.customCategory.questions.map((question, index) => {
        console.log('custom question', question)

        return(
            <div className="questions-list" key={index}>
                    <div className="quiz-question" >Question: {question.quiz_question}</div>
                    
                    <div className="button-div">
                        <button 
                            onClick={() => {
                                props.catToUpdateQuestion(props.customCategory)
                                props.selectQuestion(question)
                                props.history.push('/editquestion')}}>
                            Edit
                        </button>
                        <button onClick={() => {props.handleDelete(question)}}>Delete</button>
                    </div>
            </div>
        )
    })

    const loading = "no questions"

    return(
        <>
            {props.customCategory ? loaded : loading}
        </>
    )
}
export default withRouter(CustomQsList)