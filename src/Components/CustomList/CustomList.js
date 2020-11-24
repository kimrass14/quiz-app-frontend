import React from 'react'
import CustomQsList from '../CustomQsList/CustomQsList'
import './CustomList.scss'

const CustomList = (props) => {
    console.log('custom list props', props)

    const loaded = props.categories.filter(category => category.created === "custom").map((customCategory, index) => {
        console.log('custom category', customCategory)

        return(
            <div className="custom-list">
                <div className="category">
                    <div className="category-name" key={index}>Category: {customCategory.name}</div>
                    <button 
                        onClick={() => {
                            props.selectCategory(customCategory)
                            props.history.push('/editcategory')}}>
                        Update
                    </button>
                    <button onClick={() => {props.handleDelete(customCategory)}}>Delete</button>
                </div>
                <CustomQsList customCategory={customCategory} handleDelete={props.handleDeleteQs}/>
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