import React, {useEffect, useState} from 'react'
import './MultipleChoice.scss'

const MultipleChoice = (props) => {

    const [choices, setChoices] = useState([])
    const [message, setMessage] = useState()

    useEffect(() => {
        setMessage(props.clearMessage)
    }, [props])

    const handleCompare = (userAnswer) => {
        const questionObj = props.question
        if (userAnswer === questionObj.correct_answer) {

            const updatedQuestionObj = {...questionObj}
            updatedQuestionObj.user_answer = "correct"
            
            const updateUserAnswer = async (updatedQuestion) => {
                try{
                    
                    const response = await fetch(props.url + '/categories/' + questionObj.category_id + '/questions/' + questionObj.id,
                    {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(updatedQuestion)
                    })
                    const res = await response.json()
                } catch (error) {
                    console.log(error)
                }
            }
            updateUserAnswer(updatedQuestionObj)
            setMessage("Correct!")

        } else {
            setMessage("Incorrect...")
        }
       
    }

    useEffect(() => {
        const questionObj = props.question
        if (props.question) {
            let choices = []
            choices.push(questionObj.correct_answer, questionObj.incorrect_answer_1, questionObj.incorrect_answer_2, questionObj.incorrect_answer_3)
            const shuffledChoices = choices.sort(() => Math.random() - 0.5)
            setChoices(shuffledChoices)
        }
    }, [props.question])

    const multipleChoice = choices.map((choice, index) => {
        return(
            <input 
                key={index}
                type="button" 
                value={choice}
                onClick={() => {handleCompare(choice)}}
            />
        )
    })

    return(
        <div className="choice-div">
            <div className="multiple-choice">
                {multipleChoice}
                <div className="message">{message}</div>
            </div>
        </div>
    )
}
export default MultipleChoice