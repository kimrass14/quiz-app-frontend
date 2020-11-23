import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './BubbleChart.scss'

const BubbleChart = () => {
    
    // const dataSet = [
    //     {"category": "Science", "correct": 5},
    //     {"category": "Math", "correct": 10},
    //     {"category": "Geography", "correct": 15},
    //     {"category": "Music", "correct": 3},
    //     {"category": "General", "correct": 8},
    // ]

    const dataSet = [5,9,10,14,20]

    // const [dataSet, setDataSet] = useState(score)
    // console.log('dataset', dataSet)
    const gRef = useRef()

    useEffect(() => {
        ready()
    }, [dataSet])

    //d3.queue().defer(d3.csv, "sales.csv").await(ready)

    const ready = () => {

    const circles = d3
        .select(gRef.current)
        .selectAll('numbers')
        .data(dataSet, (d) => d)
        .enter().append("circle")
        .attr("class", "category")
        .attr("r", 10)
        .attr("fill", "blue")
    console.log('circles', circles)

    }

    return(
        <div className="container">
            <div>BubbleChart</div>
            <div id="viz">
            <svg>
                <g ref={gRef} transform="translate(0,0)"></g>    
            </svg>    
            </div>
        </div>
    )
}
export default BubbleChart