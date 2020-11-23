import React, {useEffect, useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {
    console.log('quiz props', props)

    ///TESTING////
    // const questionsArr = [
    //     {
    //     "id": 4,
    //     "quiz_question": "What country is the second largest in the world by area?",
    //     "correct_answer": "Canada",
    //     "incorrect_answer_1": "Russia",
    //     "incorrect_answer_2": "China",
    //     "incorrect_answer_3": "USA",
    //     "category_id": 2,
    //     "created_at": "2020-11-21T18:12:17.626Z",
    //     "updated_at": "2020-11-22T21:21:05.725Z",
    //     "user_answer": "incorrect"
    //     },
    //     {
    //     "id": 5,
    //     "quiz_question": "What is the capital of Jamaica?",
    //     "correct_answer": "Kingston",
    //     "incorrect_answer_1": "San Juan",
    //     "incorrect_answer_2": "Port-au-Prince",
    //     "incorrect_answer_3": "Bridgetown",
    //     "category_id": 2,
    //     "created_at": "2020-11-21T18:12:17.632Z",
    //     "updated_at": "2020-11-22T21:21:19.501Z",
    //     "user_answer": "incorrect"
    //     }]

//ERROR: component was unmounting before receiving state. quiz_question was undefined
//Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//tried TEST DATA
    const questionsArr = props.selectedCatAndQuestions.questions
    // console.log('questionsArr', questionsArr)

    //reassigning 'selectedCatAndQuestions' state from App to be 'questionsArr' state in this component. ok??
    const [nextArr, setNextArr] = useState([questionsArr])
    console.log('nextArr', nextArr)
    
    const loaded = (questionsArr2) => {
        console.log('loaded function called', questionsArr)
        return(
            <>
                <div>{questionsArr2[0].quiz_question}</div>
                <MultipleChoice url={props.url} question={questionsArr2[0]} handleCorrect={handleCorrect} handleIncorrect={handleIncorrect}/>
            </>
        )
    }

    const noMoreIncorrect = "You answered all questions correctly!"
    
    const handleCorrect = () => {
        const updatedArr = [...nextArr]
        updatedArr.splice(0,1)
        setNextArr(updatedArr)
        console.log('questionsArr - correct', updatedArr)
    }

    const handleIncorrect = () => {
        const updatedArr = [...nextArr]
        updatedArr.push(updatedArr.shift())
        setNextArr(updatedArr)
        console.log('questionsArr - incorrect', updatedArr)
        //NEXTARR ISN'T CHANGING TO AN UPDATED ARRAY
    }

    return(
        <div className="quiz">
            <div>Quiz</div>
            {questionsArr ? loaded(questionsArr) : <div>nothing</div>}
            <button onClick={
                nextArr ? loaded(nextArr) : {noMoreIncorrect}}
                >Next</button>
            {/* onClick of button call loaded function and render updated questions array from handleCorrect and handleIncorrect */}
        </div>
    )
}
export default Quiz