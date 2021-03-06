import React, {useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {

    const [clearMessage, setClearMessage] = useState("")

    const handleResetCategory = (category) => {
        fetch(props.url + '/categories/' + category.id + '/reset', {
            method: 'put',
        }).then(response => props.handleGetCatQuestions(category)).then(response => props.getCategories()) //getCategories needed to update counts in chart
    }

   
    const handleResetAll = (category) => {
        fetch(props.url + '/questionsreset', {
            method: 'put',
        }).then(response => props.handleGetCatQuestions(category)).then(response => props.getCategories()) //getCategories needed to update counts in chart
    }
    
    const loaded = () => {
        const incorrectQsArr = props.selectedCatAndQuestions.questions.filter(question => question.user_answer !== "correct")
        const shuffledIncorrectQs = incorrectQsArr.sort(() => Math.random() - 0.5)

        return(
            <>
                <div className="quiz-header">
                    <h2>{props.selectedCatAndQuestions.name}</h2>
                    <button onClick={() => {handleResetCategory(props.selectedCatAndQuestions)}}>Reset Category</button>
                </div>
                
                {shuffledIncorrectQs.length > 0 ? 
                    <>
                        <div className="question">{shuffledIncorrectQs[0].quiz_question}</div>
                        <MultipleChoice question={shuffledIncorrectQs[0]} url={props.url} clearMessage={clearMessage}/>
                        <button onClick={() => {
                            props.handleGetCatQuestions(props.selectedCatAndQuestions)
                            props.getCategories() //needed to update number correct in chart
                            setClearMessage("")
                            }}>Next
                        </button>
                    </> 
                    : <div className="all-correct">You answered all questions correctly!</div>}
                <button className="reset-btn"onClick={() => {handleResetAll(props.selectedCatAndQuestions)}}>Reset All</button>
            </>
        )
    }
    
    const noQuestions = "Add questions to this category"

    return(
        <div className="quiz">
            {props.selectedCatAndQuestions.questions && props.selectedCatAndQuestions.questions.length > 0 ? loaded() : noQuestions}
        </div>
    )
}
export default Quiz