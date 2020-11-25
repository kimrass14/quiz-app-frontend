import React from 'react'
import CustomQsList from '../CustomQsList/CustomQsList'
import './CustomList.scss'

const CustomList = (props) => {
    // console.log('custom list props', props)

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
                            Update
                        </button>
                        <button onClick={() => {props.handleDelete(customCategory)}}>Delete</button>
                    </div>
                </div>
                <CustomQsList customCategory={customCategory} handleDelete={props.handleDeleteQs}/>
            </div>
        
        )
    })

    const loading = "no categories"

    return(
        <div className="custom-list">
            <h2>Your categories and questions</h2>
            
                {props.categories ? loaded : loading}
            
        </div>
    )
}
export default CustomList