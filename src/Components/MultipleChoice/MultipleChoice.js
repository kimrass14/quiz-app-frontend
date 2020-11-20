import React, {useEffect, useState} from 'react'
import './MultipleChoice.scss'

const MultipleChoice = (props) => {
    console.log('mult choice props', props)

    const [choices, setChoices] = useState([])

    const questionObj = props.question

    useEffect(() => {
        if (props.question) {
        let choices = []
        choices.push(questionObj.correct_answer, questionObj.incorrect_answer_1, questionObj.incorrect_answer_2, questionObj.incorrect_answer_3)
        setChoices(choices)
        }
    }, [props.question])
    
    console.log('choices', choices)

    //need to shuffle choices array, then map over shuffled array

    const multipleChoice = choices.map((choice, index) => {
        return(
            <div>{choice}</div>
        )
    })


    return(
        <div className="multiple-choice">
            <div>MultipleChoice</div>
            <div>{multipleChoice}</div>
        </div>
    )
}
export default MultipleChoice