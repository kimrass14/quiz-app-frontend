import React from 'react'
import BubbleChart from '../BubbleChart/BubbleChart'

const BubbleData = (props) => {
    

    //needs to receive:
    //list off all categories
    //count of questions where user_answer === "correct"
    //push into an object with an id key
    //push each object into an array called dataSet
    
    let dataSet = []
    // let dataSetCount = []
    
    const loaded = () => {return props.categories.map((category, index) => {

        // console.log('category questions', category.questions)
        const newArr = category.questions.filter(question => question.user_answer === "correct")
        // console.log('new array', newArr)
        const count = newArr.length

        const categoryObj = {["id"]:category.id, ["name"]:category.name, ["correct_count"]:count}
        dataSet.push(categoryObj)
        

    })
    }
    

    return(
        <>
            
            <BubbleChart dataSet={dataSet} />
            
            {props.categories ? loaded() : <div>waiting</div>}
        </>
    ) 
}
export default BubbleData
