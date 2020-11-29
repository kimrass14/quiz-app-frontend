import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3'
import './BubbleChart.scss'
import { scaleSqrt } from 'd3'

const BubbleChart = (props) => {
    // console.log('bubble chart props', props)

    const [dataArr, setDataArr] = useState(props.dataSet)
    const gRef = useRef()

    useEffect(() => {
        console.log('use effect dataSet', props.dataSet)
        
        setDataArr(props.dataSet)
        console.log('dataArr', dataArr)
    }, [props.dataSet])
    // }, [props.dataSet[0].correct_count])
// }, [...props.dataSet.map(item => item.correct_count)])

    //scaleSqrt bc circles. Domain is range in dataset
    //range is min and max size I want the circles to be
    const radiusScale = d3.scaleSqrt().domain([0, 15]).range([30, 100])
   
    const simulation = d3.forceSimulation()
        .force("x", d3.forceX(400 /2).strength(.04))
        .force("y", d3.forceY(300 /2).strength(.04))
        .force("collide", d3.forceCollide(function(d) {
            return radiusScale(d.correct_count) + 1
        }))

    useEffect(() => {
        console.log('dataArr', dataArr)

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
            .attr("font-family", "sans-serif")
            .attr("color", "black")
            .style("font-size", "2px")
            .each(getSize)
            .style("font-size", function(d) {
                return d.scale + "px"
            })
        
            function getSize(d) {
                let bbox = this.getBBox(),
                    cbbox = this.parentNode.getBBox(),
                    scale = Math.min(cbbox.width/bbox.width, cbbox.height/bbox.height);
                d.scale = scale;
            }
        

        //tick function for simulations. standard function.
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
        
        //at every tick of clock, run ticked function
        simulation.nodes(dataArr)
            .on('tick', ticked)

    }, [dataArr])
    // }, [...dataArr.map(item => item.correct_count)])


    return(
        <div className="container">
            {/* <div>BubbleChart</div> */}
            <div id="viz">
            <svg>
                <g ref={gRef} transform="translate(0,0)"></g>    
            </svg>    
            </div>
        </div>
    )
}
export default BubbleChart