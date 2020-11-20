import React, {useEffect, useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {

    const [question, setQuestion] = useState("select a category")

    const questionsArr = props.selectedCategory.questions
    // console.log('questionsArr', questionsArr)

    useEffect(() => {
        if (questionsArr) {
        const incorrectQs = questionsArr.filter(question => question.user_answer === "incorrect")
        // console.log('incorrectQs', incorrectQs)
        setQuestion(incorrectQs)
        }
    }, [questionsArr])
    
    const noMoreIncorrect = "You answered all questions correctly!"

    return(
        <div className="quiz">
            <div>Quiz</div>
            {question ? <div>{question[0].quiz_question}</div> : <div>{noMoreIncorrect}</div>}
            <MultipleChoice question={question[0]}/>
        </div>
    )
}
export default Quiz