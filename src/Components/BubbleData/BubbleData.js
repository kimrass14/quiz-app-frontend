import React from 'react'
import BubbleChart from '../BubbleChart/BubbleChart'
import CategoryForm from '../CategoryForm/CategoryForm'

const BubbleData = (props) => {

    //needs to receive:
    //list off all categories
    //count of questions where user_answer === "correct"
    //push into an object with an id key
    //push each object into an array called dataSet
    

        // let arr = []
        //props.categories.map((category, index) => {
            // const name = category.name
            // const obj = {[name]:category.name, [id]:category.id}
            // arr.push(obj)
        // })
        //console.log('array of categories', arr)
    
    //TEST//
    let arr = []
    const obj = {name: "science", id: 1}
    const addObj = {...obj, count: 5}
    arr.push(addObj)
    console.log('array', arr)
    
    
    const dataSet = [
        {id: 1, name: "Science", num: 0},
        {id: 2, name: "Math", num: 9},
        {id: 3, name: "Geography", num: 15},
        {id: 4, name: "Music", num: 10},
        {id: 5, name: "General", num: 25},
    ]

    return(
        <>
            <div>BubbleData</div>
            <BubbleChart dataSet={dataSet} />
        </>
    )
}
export default BubbleData