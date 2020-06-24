import React, { Fragment, FunctionComponent } from 'react';

interface IProps {
    numberOfStars: string,
    value: string,
    onClick: (selected: string) => void,
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

const StarRating: FunctionComponent<IProps> = (props: IProps) => {
    // create an array that is length of numberOfStars, with values 0 to numberOfStars
    const numberOfStarsArray = Array.from(Array(parseInt(props.numberOfStars, 10)).keys());

    const clickHandler = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        const selectedValue = target.value;
        props.onClick(selectedValue);
    }

    return (
       <>
        {
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