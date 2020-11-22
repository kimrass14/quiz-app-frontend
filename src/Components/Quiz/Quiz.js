import React, {useEffect, useState} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import './Quiz.scss'

const Quiz = (props) => {
    console.log('quiz props', props)

    const questionsArr = props.selectedCatAndQuestions.questions

    // const [questionsArr, setQuestionsArr] = useState([props.selectedCatAndQuestions.questions])
    console.log('questionsArr', questionsArr)

    // const loaded = () => {
    //     const incorrectQsArr = questionsArr.filter(question => question.user_answer !== "correct")
    //     const shuffledIncorrectQs = incorrectQsArr.sort(() => Math.random() - 0.5)
    //     console.log('shuffled', shuffledIncorrectQs)
        
    //     //was passing shuffledincorrectQs to state and then trying to return values
    //     //but state wasn't updating

    //     //consider changing NEXT button. Instead of shuffling questions array,
    //     //go to next position in array. But what to do when reach end of array and need to start back at 0??
    //     //NEXT after incorrectly answered: Instead of re-fetching questions, move incorrectly answered question to the end of the array
    //     //NEXT after correctly answered: remove item from array
    //     return(
    //         <>
    //             <div>{shuffledIncorrectQs[0].quiz_question}</div>
    //             <MultipleChoice question={shuffledIncorrectQs[0]} url={props.url}/>
    //         </>
    //     )
    // }
    
    const loaded = () => {
        console.log('loaded function called', questionsArr)
        return(
            <>
                <div>{questionsArr[0].quiz_question}</div>
                <MultipleChoice question={questionsArr[0]} handleCorrect={handleCorrect} handleIncorrect={handleIncorrect}/>
            </>
        )
    }

    const noMoreIncorrect = "You answered all questions correctly!"
    
    const handleCorrect = () => {
        questionsArr.shift()
        console.log('questionsArr - correct', questionsArr)
    }

    const handleIncorrect = () => {
        questionsArr.push(questionsArr.shift())
        console.log('questionsArr - incorrect', questionsArr)
    }


    return(
        <div className="quiz">
            <div>Quiz</div>
            {questionsArr === 'undefined' ? loaded : noMoreIncorrect}
            <button onClick={() => {loaded()}}>Next</button>
            {/* <button onClick={questionsArr ? loaded() : <div>{noMoreIncorrect}</div>}>Next</button> */}
        </div>
    )
    // return(
    //     <div className="quiz">
    //         <div>Quiz</div>
    //         {questionsArr ? loaded() : <div>{noMoreIncorrect}</div>}
    //         <button onClick={() => {props.handleGetCatQuestions(props.selectedCatAndQuestions)}}>Next</button>
    //     </div>
    // )
}
export default Quiz