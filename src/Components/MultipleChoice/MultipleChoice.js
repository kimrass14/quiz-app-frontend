import React, {useEffect, useState} from 'react'
import './MultipleChoice.scss'

const MultipleChoice = (props) => {
    console.log('mult choice props', props)

    const [choices, setChoices] = useState([])
    const [message, setMessage] = useState("")

    //passed as props from App
    // const url = 'http://localhost:3000'
    // const url = 'https://quiz-app-kr-backend.herokuapp.com'

    const questionObj = props.question

    const handleCompare = (userAnswer) => {
        if (userAnswer === questionObj.correct_answer) {

            const updatedQuestionObj = {...questionObj}
            updatedQuestionObj.user_answer = "correct"
            
            const updateUserAnswer = async (updatedQuestion) => {
                // console.log('fetch updatedQuestionObj', updatedQuestion)
                
                try{
                    
                    const response = await fetch(props.url + '/categories/' + questionObj.category_id + '/questions/' + questionObj.id,
                    {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(updatedQuestion)
                    })
                    const res = await response.json()
                    console.log('updated user answer in db', res)
                    
                    // res ? props.handleCorrect() : <div>wait</div>     

                } catch (error) {
                    console.log(error)
                }
            }
            updateUserAnswer(updatedQuestionObj)
            
            setMessage("Nice job. Correct Answer!")

        } else {
            console.log("incorrect answer")
            props.handleIncorrect()
            setMessage("That is not correct")
        }
        // return(
        //     <div></div>
        // )
    }

    

    useEffect(() => {
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
        <div className="multiple-choice">
            {/* <div>MultipleChoice</div> */}
            {multipleChoice}
            <div>{message}</div>
            {/* <input
                type="button"
                value={choices[0]}
                onClick={handleCompare}
            /> */}
        </div>
    )
}
export default MultipleChoice