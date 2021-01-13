import React from 'react'
import BubbleChart from '../BubbleChart/BubbleChart'

const BubbleData = (props) => {
    
    //Receiving list of all categories
    //counts questions where user_answer === "correct"
    //push into an object with an id key
    //push each object into an array called dataSet
    
    let dataSet = []
    
    const loaded = () => {return props.categories.map((category, index) => {

        const newArr = category.questions.filter(question => question.user_answer === "correct")
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
