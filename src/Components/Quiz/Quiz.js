import React, {useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {
    console.log('quiz props', props)

    const loaded = () => {
        const incorrectQsArr = props.selectedCatAndQuestions.questions.filter(question => question.user_answer !== "correct")
        const shuffledIncorrectQs = incorrectQsArr.sort(() => Math.random() - 0.5)
        console.log('shuffled', shuffledIncorrectQs)

        return(
            <>
                {shuffledIncorrectQs.length > 0 ? <div>{shuffledIncorrectQs[0].quiz_question}</div> : <div>You answered all questions correctly!</div>}
                <MultipleChoice question={shuffledIncorrectQs[0]} url={props.url} getCategories={props.getCategories} addCount={props.addCount}/>
            </>
        )
    }
    
    const noQuestions = "Add questions to this category"

    return(
        <div className="quiz">
            <div>Quiz</div>
            {props.selectedCatAndQuestions.questions && props.selectedCatAndQuestions.questions.length > 0 ? loaded() : noQuestions}
            
            <button onClick={() => {
                props.handleGetCatQuestions(props.selectedCatAndQuestions)}}>Next
            </button>
        </div>
    )
}
export default Quiz