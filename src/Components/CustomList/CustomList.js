import React from 'react'
import CustomQsList from '../CustomQsList/CustomQsList'
import './CustomList.scss'

const CustomList = (props) => {
    // console.log('custom list props', props)

    //call getCategories here instead of at end of PUT fetch?
    //had to remove getCategories call from put request bc it was sending another question in the quiz when correct answer was selected

    const loaded = props.categories.filter(category => category.created === "custom").map((customCategory, index) => {
        // console.log('custom category', customCategory)

        return(
        
            <div className="each-cat" key={index}>
                <div className="category">
                    <div className="category-name" >Category: {customCategory.name}</div>
                    <div className="button-div">
                        <button 
                            onClick={() => {
                                props.selectCategory(customCategory)
                                props.history.push('/editcategory')}}>
                            Edit
                        </button>
                        <button onClick={() => {props.handleDelete(customCategory)}}>Delete</button>
                    </div>
                </div>
                <CustomQsList customCategory={customCategory} handleDelete={props.handleDeleteQs} selectQuestion={props.selectQuestion} catToUpdateQuestion={props.catToUpdateQuestion}/>
            </div>
        
        )
    })

    const loading = "no categories"

    return(
        <div className="custom-list">
            <h3>Your categories and questions</h3>
            
                {props.categories ? loaded : loading}
            
        </div>
    )
}
export default CustomList