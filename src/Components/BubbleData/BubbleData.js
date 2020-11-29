import React from 'react'
import BubbleChart from '../BubbleChart/BubbleChart'

const BubbleData = (props) => {
    //PROPS CATEGORIES ISN'T GETTING PASSED UPDATED QUESTIONS WITH USER ANSWER UPDATES TO CORRECT

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
        console.log('dataSet', dataSet)
        //create dataSet state
        //spread dataSet variable and add each category obj to it

    })
    }
    //tried adding another item to the array as a counter, but d3 freaked out and crashed
    // const dataSetCount = [...dataSet, props.counter]

    
    // console.log('dataSet - count', dataSetCount)
    //returns array of objects. Each object is a category with id and count of correct

    return(
        <>
            <div>BubbleData</div>
            <BubbleChart dataSet={dataSet} />
            {/* <BubbleChart dataSet={dataSetCount} /> */}
            {props.categories ? loaded() : <div>waiting</div>}
        </>
    ) 
}
export default BubbleData

 //TEST DATA
    // const dataSet = [
    //     {id: 1, name: "Science", num: 0},
    //     {id: 2, name: "Math", num: 9},
    //     {id: 3, name: "Geography", num: 15},
    //     {id: 4, name: "Music", num: 10},
    //     {id: 5, name: "General", num: 25},
    // ]