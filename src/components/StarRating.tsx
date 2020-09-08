import React, { Fragment, FunctionComponent } from 'react';
import { Star } from './Star';

interface IProps {
    numberOfStars: string,
    value: number,
    onClick: (selected: number) => void,
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

const StarRating: FunctionComponent<IProps> = (props: IProps) => {
    // create an array that is length of numberOfStars, with values 0 to numberOfStars
    const numberOfStarsArray = Array.from(Array(parseInt(props.numberOfStars, 10)).keys());

    const clickHandler = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        const selectedValue = parseInt(target.value, 10);
        props.onClick(selectedValue);
    }

    return (
        <>
        {
            Object.keys(numberOfStarsArray).map((key, index) => (
                <Fragment key={key}>
                    <input 
                        type="radio" 
                        name="rating" 
                        id={`rating-${parseInt(key, 10) + 1}`} 
                        value={parseInt(key, 10) + 1} 
                        onChange={(e) => {
                            clickHandler(e);
                        }}
                        checked={props.value === parseInt(key, 10) + 1}
                        className="visuallyhidden"
                    />
                    <label 
                        htmlFor={`rating-${parseInt(key, 10) + 1}`}>
                            <span className="visuallyhidden">{ parseInt(key, 10) + 1 }</span>
                            <Star  />
                    </label>
                </Fragment>
            ))
        }
        </>


        // Object.keys(numberOfStarsArray).map((key) => (
        //     <Fragment key={key}>
        //         <label htmlFor={`rating-${parseInt(key, 10) + 1}`}>{ parseInt(key, 10) + 1 }</label>
        //         <input 
        //             type="radio" 
        //             name="rating" 
        //             id={`rating-${parseInt(key, 10) + 1}`} 
        //             value={parseInt(key, 10) + 1} 
        //             onChange={clickHandler}
        //             checked={parseInt(props.value, 10) === parseInt(key, 10) + 1}
        //         />
        //     </Fragment>
        // ))
    )
}

export default StarRating;