import React, { Fragment } from 'react';

class StarRating extends React.Component {

    constructor() {
        super();
        
        this.state = {
            selected: null
        }
    }

    clickHandler = (e) => {
        const selectedValue = e.target.value;
        
        // this.setState({
        //     selected: selectedValue
        // }, () => {
        //     this.props.onClick(this.state.selected);
        // });

        this.props.onClick(selectedValue);
    }

    render() {
        // create an array that is length of numberOfStars, with values 0 to numberOfStars
        const numberOfStarsArray = Array.from(Array(parseInt(this.props.numberOfStars, 10)).keys());

        return (
                Object.keys(numberOfStarsArray).map((key) => (
                    <Fragment key={key}>
                        <label htmlFor={`rating-${parseInt(key, 10) + 1}`}>{ parseInt(key, 10) + 1 }</label>
                        <input 
                            type="radio" 
                            name="rating" 
                            id={`rating-${parseInt(key, 10) + 1}`} 
                            value={parseInt(key, 10) + 1} 
                            onClick={this.clickHandler}
                        />
                    </Fragment>
                ))
        )
    }
};

export default StarRating;