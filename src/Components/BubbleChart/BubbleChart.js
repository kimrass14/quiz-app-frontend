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

    const dataSet = [
        {"id": 1, "num": 5},
        {"id": 2, "num": 9},
        {"id": 3, "num": 15},
        {"id": 4, "num": 10},
        {"id": 5, "num": 25},
    ]

    // const [dataSet, setDataSet] = useState(score)
    // console.log('dataset', dataSet)
    const gRef = useRef()

    // useEffect(() => {
    //     ready()
    // }, [dataSet])

    const radiusScale = d3.scaleSqrt().domain([])

    //forced to x and y
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(250 /2).strength(.05))
        .force("y", d3.forceY(250 /2).strength(.05))
        .force("collide", d3.forceCollide(10))


    const ready = () => {

        //binding dataset to circle elements created within the g element
        const circles = d3
            .select(gRef.current)
            .selectAll('circles')
            .data(dataSet)
            .enter().append("circle")
            .attr("class", "category")
            .attr("r", 10)
            .attr("fill", "blue")
            .attr("cx", 125)
            .attr("cy", 125)
        console.log('circles', circles)

        //tick function for simulations. pretty standard.
        const ticked = () => {
            circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                })
        }

        //at every tick of clock, run ticked function
        simulation.nodes(dataSet)
            .on('tick', ticked)

    }
    ready()

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