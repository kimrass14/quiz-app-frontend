import React from 'react'
import {Link} from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Nav.scss'

const Nav = (props) => {  

  const loaded = props.categories.map((cat, index) => {
        return(
          <Dropdown.Item as={Link} to="/quiz" key={index} onClick={() => {props.handleGetCatQuestions(cat)}}>{cat.name}</Dropdown.Item>
        )
    })

    const loading = 'loading categories'

    return(
        <>
            <Link to="/"><div className="app-name">The Quiz</div></Link>
            <Link to="/customcategory"><div className="custom-link">Create</div></Link>
            <Link to="/customlist"><div className="custom-link">View</div></Link>
            <Dropdown>
              <Dropdown.Toggle variant="gray-dark" id="dropdown-basic" className="custom-link">Category</Dropdown.Toggle>
              <Dropdown.Menu>
                {props.categories.length > 0 ? loaded : loading}
              </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
export default Nav