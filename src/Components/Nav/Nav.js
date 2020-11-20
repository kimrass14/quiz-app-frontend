import React from 'react'
import {Link, route} from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import './Nav.scss'

const Nav = () => {

    return(
        <>
            <div>The Quiz</div>
            <Link to="/customquestion"><div className="cat-dropdown">Create</div></Link>
            <Dropdown>
              <Dropdown.Toggle variant="gray-dark" id="dropdown-basic">Category</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-1">Category 1</Dropdown.Item>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-2">Category 2</Dropdown.Item>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-3">Category 3</Dropdown.Item>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-3">Category 4</Dropdown.Item>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-3">Category 5</Dropdown.Item>
                <Dropdown.Item as={Link} to="/quiz" href="#/action-3">Category 6</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

        </>
    )
}
export default Nav