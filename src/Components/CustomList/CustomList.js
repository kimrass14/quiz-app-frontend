import React, {useState, useEffect} from 'react'
import './CustomList.scss'

const CustomList = (props) => {
    console.log('custom list props', props)

    const loaded = props.categories.filter(category => category.created === "custom").map((customCategory, index) => {

        return(
            <div className="custom-list">
                <div className="category">
                    <div className="category-name" key={index}>{customCategory.name}</div>
                    <button 
                        onClick={() => {
                            props.selectCategory(customCategory)
                            props.history.push('/editcategory')}}>
                        Update
                    </button>
                </div>
                

            </div>
        )
    })

    const loading = "no categories"

    return(
        <>
            <div>CustomList</div>
            {props.categories ? loaded : loading}
        </>
    )
}
export default CustomList