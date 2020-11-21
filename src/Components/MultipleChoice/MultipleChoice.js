import React, {useEffect, useState} from 'react'
import './MultipleChoice.scss'

const MultipleChoice = (props) => {
    // console.log('mult choice props', props)

    const [choices, setChoices] = useState([])

    const handleCompare = (userAnswer) => {

        if (userAnswer === questionObj.correct_answer) {
            console.log("correct")
        } else {
            console.log("incorrect")
        }

        return(
            <div></div>
        )
    }

    const questionObj = props.question

    useEffect(() => {
        if (props.question) {
        let choices = []
        choices.push(questionObj.correct_answer, questionObj.incorrect_answer_1, questionObj.incorrect_answer_2, questionObj.incorrect_answer_3)
        const shuffledChoices = choices.sort(() => Math.random() - 0.5)
        setChoices(shuffledChoices)
        }
    }, [props.question])

    //need to shuffle choices array, then map over shuffled array
    // const shuffledChoices = choices.sort(() => Math.random() - 0.5)
    // console.log('shuffledChoices', shuffledChoices)

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
        <div className="multiple-choice">
            <div>MultipleChoice</div>
            {multipleChoice}
            {/* <input
                type="button"
                value={choices[0]}
                onClick={handleCompare}
            /> */}
        </div>
    )
}
export default MultipleChoice