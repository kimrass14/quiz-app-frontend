import React, {useEffect, useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {
    console.log('quiz props', props)

    const [question, setQuestion] = useState([])

    const questionsArr = props.selectedCatAndQuestions.questions

    const loaded = () => {
        console.log('loaded')
        const incorrectQsArr = questionsArr.filter(question => question.user_answer !== "correct")
        const shuffledIncorrectQs = incorrectQsArr.sort(() => Math.random() - 0.5)
        console.log('shuffled', shuffledIncorrectQs)
        
        // useEffect(() => {
        //     setQuestion(shuffledIncorrectQs)
        // },[])

        return(
            <>
                <div>{shuffledIncorrectQs[0].quiz_question}</div>
                <MultipleChoice question={shuffledIncorrectQs[0]} url={props.url}/>
            </>
        )
    }
    
    
    const noMoreIncorrect = "You answered all questions correctly!"

    return(
        <div className="quiz">
            <div>Quiz</div>
            {questionsArr ? loaded() : <div>{noMoreIncorrect}</div>}
            {/* <MultipleChoice question={question[0]} url={props.url}/> */}
            <button onClick={() => {props.handleGetCatQuestions(props.selectedCatAndQuestions)}}>Next</button>
        </div>
    )
}
export default Quiz