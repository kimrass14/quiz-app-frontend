import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3'
import './BubbleChart.scss'
import { scaleSqrt } from 'd3'

const BubbleChart = (props) => {
    console.log('bubble chart props', props)

//RECEIVING UPDATED DATA UPON USER SELECTING CORRECT ANSWER
//BUT CHART IS NOT RE-RENDERING

    const [dataArr, setDataArr] = useState(props.dataSet)
    const gRef = useRef()

    // useEffect(() => {
    //     setDataArr(props.dataSet)
    // }, [props.dataSet])

    //scaleSqrt bc circles. Domain is range in dataset
    //range is min and max size I want the circles to be
    const radiusScale = d3.scaleSqrt().domain([0, 25]).range([10, 100])
   
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(250 /2).strength(.05))
        .force("y", d3.forceY(250 /2).strength(.05))
        .force("collide", d3.forceCollide(function(d) {
            return radiusScale(d.correct_count) + 1
        }))

    //data passed to dataArr state when useEffect is called. Supposed to change when counter changes

    useEffect(() => {
        setDataArr(props.dataSet)
        console.log('dataArr', dataArr)

        // const radiusScale = d3.scaleSqrt().domain([0, 25]).range([10, 100])
        //binding dataset to circle elements created within the g element

        const circles = d3
            .select(gRef.current)
            .selectAll("circle")
            .data(dataArr)
            .enter().append("circle")
            .attr("class", "category")
            .attr("r", function(d) {
                return radiusScale(d.correct_count)
            })
            .attr("fill", "white")
            // .attr("cx", 125)
            // .attr("cy", 125)
        console.log('circles', circles)

        const text = d3
            .select(gRef.current)
            .selectAll("text")
            .data(dataArr)
            .enter().append("text")
            .text(function(d) {
                return d.name + ": " + d.correct_count
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
        
    // const simulation = d3.forceSimulation()
    //     .force("x", d3.forceX(250 /2).strength(.05))
    //     .force("y", d3.forceY(250 /2).strength(.05))
    //     .force("collide", d3.forceCollide(function(d) {
    //         return radiusScale(d.correct_count) + 1
    //     }))
        
        //at every tick of clock, run ticked function
        simulation.nodes(dataArr)
            .on('tick', ticked)
    }, [])
    // }, [props.dataSet])


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