import React, { Fragment } from 'react';

class StarRating extends React.Component {
    

    generateStuff() {
        const numberOfStarsArray = Array(parseInt(this.props.numberOfStars, 10));
        const numberOfStarsKeys = numberOfStarsArray.keys();
        let html = '';

        for(const key of numberOfStarsKeys) {
            html += `
                        <label for="rating-${key}">${key}</label>
                        <input type="radio" name="rating" id="rating-${key}" value="${key}" />
                    `
        }
        return html;
    }

    test(l) {
        console.log();
        return 5
    }

    render() {

        const numberOfStarsArray = Array.from(Array(parseInt(this.props.numberOfStars, 10)).keys())
       
        
        

        return (
                Object.keys(numberOfStarsArray).map((key) => (
                    <Fragment>
                        <label htmlFor={`rating-${parseInt(key, 10) + 1}`}>{ parseInt(key, 10) + 1 }</label>
                        <input type="radio" name="rating" id={`rating-${parseInt(key, 10) + 1}`} value={parseInt(key, 10) + 1} />
                    </Fragment>
                ))
        )
    }
};

export default StarRating;