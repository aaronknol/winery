import React, { Fragment } from 'react';

function StarRating (props) {
    // create an array that is length of numberOfStars, with values 0 to numberOfStars
    const numberOfStarsArray = Array.from(Array(parseInt(props.numberOfStars, 10)).keys());

    const clickHandler = (e) => {
        const selectedValue = e.target.value;
        props.onClick(selectedValue);
    }

    return (

        Object.keys(numberOfStarsArray).map((key) => (
            <Fragment key={key}>
                <label htmlFor={`rating-${parseInt(key, 10) + 1}`}>{ parseInt(key, 10) + 1 }</label>
                <input 
                    type="radio" 
                    name="rating" 
                    id={`rating-${parseInt(key, 10) + 1}`} 
                    value={parseInt(key, 10) + 1} 
                    onChange={clickHandler}
                    checked={parseInt(props.value, 10) === parseInt(key, 10) + 1}
                />
            </Fragment>
        ))
    )
}

export default StarRating;