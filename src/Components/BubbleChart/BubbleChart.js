import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3'
import './BubbleChart.scss'

const BubbleChart = (props) => {

    const [dataArr, setDataArr] = useState(props.dataSet)
    const gRef = useRef()

    useEffect(() => {
        setDataArr(props.dataSet)
    }, [props.dataSet])

    const radiusScale = d3.scaleSqrt().domain([0, 15]).range([30, 100])
   
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(400 /2).strength(.04))
        .force("y", d3.forceY(300 /2).strength(.04))
        .force("collide", d3.forceCollide(function(d) {
            return radiusScale(d.correct_count) + 8
        }))

    useEffect(() => {
         const circles = d3
            .select(gRef.current)
            .selectAll("circle")
            .data(dataArr)
            .join("circle")
            .attr("r", function(d) {
                return radiusScale(d.correct_count)
            })
            .attr("fill", "white")
            .attr("class", "category")

        const label = d3
            .select(gRef.current)
            .selectAll("text")
            .data(dataArr)
            .join("text")
            .attr("class", "name")
            .text(function(d) {
                return d.name + ": " + d.correct_count
            })
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .attr("font-family", "Montserrat")
            .attr("color", "#064E40")
            .style("font-size", function(d){
                if(d.correct_count < 1) {
                    return "10px"
                } else if (d.correct_count < 3) {
                    return "14px" 
                } else if (d.correct_count < 6) {
                    return "17px"
                } else if (d.correct_count < 10) {
                    return "20px"
                } else {
                    return "25px"
                }
            })
        
        const ticked = () => {
            circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                });

            label
                .attr("x", function(d) {
                    return d.x
                })
                .attr("y", function(d) {
                    return d.y
                })
        }
        
        
        simulation.nodes(dataArr)
            .on('tick', ticked)

    }, [dataArr])

    return(
        <div className="container">
            <h3>Correct by category:</h3>
            <div id="viz">
            <svg>
                <g ref={gRef} transform="translate(0,0)"></g>    
            </svg>    
            </div>
        </div>
    )
}
export default BubbleChart