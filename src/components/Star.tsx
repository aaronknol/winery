import React from 'react';

interface StarIProps {
    fill?: string
}

export const Star = (props: StarIProps) => (
    <svg height="25" width="23" fill={props.fill ? props.fill : 'transparent'} stroke="#ffd055"><polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"></polygon></svg>
);

interface StarsIProps {
    numberOfStars: number,
    cssClass: string
}

export const Stars: React.FunctionComponent<StarsIProps> = (props: StarsIProps) => {
    var starsArray = Array.from(Array(props.numberOfStars));
    
    return (
        <div className={props.cssClass}>
            <span className="wine__rating-value">{props.numberOfStars} out 5 stars</span>
        {
            starsArray.map((elem, index) => {
                return (
                    <Star fill="#ffd055" key={index} />
                )
            })
        }
        </div>
    )
}