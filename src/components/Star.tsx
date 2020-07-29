import React from 'react';

export const Star = () => (
    <svg height="25" width="23" fill="#ffd055"><polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"></polygon></svg>
);

interface IProps {
    numberOfStars: number,
    cssClass: string
}

export const Stars: React.FunctionComponent<IProps> = (props: IProps) => {
    var starsArray = Array.from(Array(props.numberOfStars));
    
    return (
        <div className={props.cssClass}>
            <span className="wine__rating-value">{props.numberOfStars} out 5 stars</span>
        {
            starsArray.map((elem, index) => {
                return (
                    <Star key={index} />
                )
            })
        }
        </div>
    )
}