// import React, {useEffect, useState} from 'react'
// import MultipleChoice from '../MultipleChoice/MultipleChoice'
// import './Quiz.scss'

// const Quiz = (props) => {
//     console.log('quiz props', props)
//     //returns selected category from dropdown, which includes the related questions

//     const [question, setQuestion] = useState("select a category")
//     const [counter, setCounter] = useState(0)

//     const questionsArr = [1,2,3]
//     // let questionsArr = props.handleGetCatQuestions.questions
//     // console.log('questionsArr - 11', questionsArr)

//     let count = 0

//     //click 'Next' button to fetch current list of questions for the category. WORKS
//     const handleNext = async () => {
//         try{
//             const getCurrentQuestions = await fetch(props.url + '/categories/' + props.selectedCategory.id)
//             const data = await getCurrentQuestions.json()
//             console.log('current question data', data)
//             // questionsArr = await data.questions.sort(() => Math.random() - 0.5)
//             questionsArr = data.questions
//             console.log('questionsArr', questionsArr)

//             count += 1
//             setCounter(count)
//             // console.log('counter', counter)
//             //pass data into which variable? new state? questionsArr
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     //infinite loop happening. need useEffect?
//     useEffect(() => {
//         handleNext()
//     }, [])

//     //get subset of questions where user_answer is not correct
//     //NEED TO SHUFFLE ARRAY bc always render question at index 0
//     console.log('questionsArr - 26', questionsArr)
//     useEffect(() => {
//         if (questionsArr) {
//         const incorrectQs = questionsArr.filter(question => question.user_answer !== "correct")
//         const shuffledIncorrectQs = incorrectQs.sort(() => Math.random() - 0.5)
//         console.log('shuffled', shuffledIncorrectQs)
//         setQuestion(shuffledIncorrectQs)
//         }
//     }, [questionsArr])
    
//     //ternary doesn't work. Breaks when all questions answered correctly and array is empty
//     const noMoreIncorrect = "You answered all questions correctly!"

    

//     return(
//         <div className="quiz">
//             <div>Quiz</div>
//             {question ? <div className="question">{question[0].quiz_question}</div> : <div>{noMoreIncorrect}</div>}
//             <MultipleChoice question={question[0]} url={props.url}/>
//             <button onClick={handleNext}>Next</button>
//         </div>
//     )
// }
// export default Quiz