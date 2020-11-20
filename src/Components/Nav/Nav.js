import React from 'react'
import {Link, route} from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Nav.scss'

const Nav = (props) => {

    const loaded = props.categories.map((cat, index) => {
        return(
          <Dropdown.Item as={Link} to="/quiz" href="#/action-3">{cat.name}</Dropdown.Item>
        )
    })

    const loading = 'loading categories'

    return(
        <>
            <Link to="/quiz"><div>The Quiz</div></Link>
            <Link to="/customquestion"><div>Create</div></Link>
            <Link to="/customlist"><div >View</div></Link>
            <Dropdown>
              <Dropdown.Toggle variant="gray-dark" id="dropdown-basic">Category</Dropdown.Toggle>
              <Dropdown.Menu>
                {props.categories.length > 0 ? loaded : loading}
              </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
export default Nav