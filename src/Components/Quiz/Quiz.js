import React, {useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {
    console.log('quiz props', props)

    const loaded = () => {
        const incorrectQsArr = props.selectedCatAndQuestions.questions.filter(question => question.user_answer !== "correct")
        const shuffledIncorrectQs = incorrectQsArr.sort(() => Math.random() - 0.5)
        console.log('shuffled', shuffledIncorrectQs)
        
        // useEffect(() => {
        //     setQuestion(shuffledIncorrectQs)
        // },[])

        return(
            <>
                <div>{shuffledIncorrectQs[0].quiz_question}</div>
                <MultipleChoice question={shuffledIncorrectQs[0]} url={props.url} getCategories={props.getCategories} addCount={props.addCount}/>
            </>
        )
    }
    
    const noMoreIncorrect = "You answered all questions correctly!"

    return(
        <div className="quiz">
            <div>Quiz</div>
            {props.selectedCatAndQuestions.questions && props.selectedCatAndQuestions.questions.length > 0 ? loaded() : noMoreIncorrect}
            
            <button onClick={() => {
                props.handleGetCatQuestions(props.selectedCatAndQuestions)}}>Next
            </button>
            {/* <button onClick={() => {
                props.handleGetCatQuestions(props.selectedCatAndQuestions)
                props.history.push('/q')}}>
                Next
            </button> */}
        </div>
    )
}
export default Quiz