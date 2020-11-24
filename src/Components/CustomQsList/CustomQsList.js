import React, {useState, useEffect} from 'react'
import './CustomQsList.scss'

const CustomQsList = (props) => {
    console.log('custom Q list props', props)

    const loaded = props.customCategory.questions.map((question, index) => {
        console.log('custom question', question)

        return(
            <div className="questions-list">
                    <div className="quiz-question" key={index}>Question: {question.quiz_question}</div>
                    {/* <button 
                        onClick={() => {
                            props.selectCategory(customCategory)
                            props.history.push('/editcategory')}}>
                        Update
                    </button> */}
                    <button onClick={() => {props.handleDelete(question)}}>Delete</button>
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
export default CustomQsList