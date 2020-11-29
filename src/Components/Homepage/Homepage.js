import React from 'react'
import './Homepage.scss'

const Homepage = (props) => {

    return(
        <div className="homepage">
            <div className="hp-name">the.Learn</div>
            <div className="about">
                <h4>Select a category to take a quiz</h4>
                <h3>&</h3>
                <h4>Create your own</h4>
            </div>
            
            <div className="quote-div">
                <div className="quote">I've learned that I still have a lot to learn.</div>
                <div className="author">Maya Angelou</div>
            </div>
        </div>
    )
}
export default Homepage