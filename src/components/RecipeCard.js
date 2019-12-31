import React from 'react'
import pictures from '../images'

export const RecipeCard = props => {
    // console.log('what is props',pictures[props.id])
    return (
        <div onClick={<Link to='/details'/>}>
            
            <div><span>{props.recipe_name}</span></div>
            <img src={pictures[props.id]} alt=''/>
 
            {/* Edit and Delete Button */}
        </div>
    )
}