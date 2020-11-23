import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './BubbleChart.scss'
import { scaleSqrt } from 'd3'

const BubbleChart = () => {

    const dataSet = [
        {"id": 1, "name": "Science", "num": 0},
        {"id": 2, "name": "Math", "num": 9},
        {"id": 3, "name": "Geography", "num": 15},
        {"id": 4, "name": "Music", "num": 10},
        {"id": 5, "name": "General", "num": 25},
    ]

    // const [dataSet, setDataSet] = useState(score)
    // console.log('dataset', dataSet)
    const gRef = useRef()

    // useEffect(() => {
    //     ready()
    // }, [dataSet])

    //scaleSqrt bc circles. Domain is range in dataset
    //range is min and max size I want the circles to be
    const radiusScale = d3.scaleSqrt().domain([0, 25]).range([10, 50])

   
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(250 /2).strength(.05))
        .force("y", d3.forceY(250 /2).strength(.05))
        .force("collide", d3.forceCollide(function(d) {
            return radiusScale(d.num) + 1
        }))


    const ready = () => {

        //binding dataset to circle elements created within the g element
        const circles = d3
            .select(gRef.current)
            .selectAll("circle")
            .data(dataSet)
            .enter().append("circle")
            .attr("class", "category")
            .attr("r", function(d) {
                return radiusScale(d.num)
            })
            .attr("fill", "white")
            // .attr("cx", 125)
            // .attr("cy", 125)
        console.log('circles', circles)

        const text = d3
            .select(gRef.current)
            .selectAll("text")
            .data(dataSet)
            .enter().append("text")
            .text(function(d) {
                return d.name + ": " + d.num
            })
            // .attr("x", 125)
            // .attr("y", 125)
            // .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("color", "black")

        //tick function for simulations. pretty standard.
        const ticked = () => {
            circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                });

            text
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