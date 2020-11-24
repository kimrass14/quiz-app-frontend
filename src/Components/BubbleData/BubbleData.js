import React from 'react'
import BubbleChart from '../BubbleChart/BubbleChart'

const BubbleData = (props) => {

    //needs to receive:
    //list off all categories
    //count of questions where user_answer === "correct"
    //push into an object with an id key
    //push each object into an array called dataSet
    
    let dataSet = []
    const loaded = props.categories.map((category, index) => {

        // console.log('category questions', category.questions)
        const newArr = category.questions.filter(question => question.user_answer === "correct")
        // console.log('new array', newArr)
        const count = newArr.length

        const categoryObj = {["id"]:category.id, ["name"]:category.name, ["correct_count"]:count}
        dataSet.push(categoryObj)

    })
    console.log('dataSet', dataSet)
    //returns array of objects. Each object is a category with id and count of correct
    
    //TEST DATA
    // const dataSet = [
    //     {id: 1, name: "Science", num: 0},
    //     {id: 2, name: "Math", num: 9},
    //     {id: 3, name: "Geography", num: 15},
    //     {id: 4, name: "Music", num: 10},
    //     {id: 5, name: "General", num: 25},
    // ]

    return(
        <>
            <div>BubbleData</div>
            <BubbleChart dataSet={dataSet} />
            {props.categories ? loaded : <div>waiting</div>}
        </>
    )
}
export default BubbleData