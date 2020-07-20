import React from 'react';

export const Star = () => (
    <svg height="25" width="23"><polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"></polygon></svg>
);

interface IProps {
    numberOfStars: number
}

export const Stars: React.FunctionComponent<IProps> = (props: IProps) => {
    var starsArray = [];

    for (var i=0;i<props.numberOfStars;i++) {
        starsArray[i] = '';
    }

    return (
        <>
        {
            starsArray.map((elem, index) => {
                return (
                    <Star key={index} />
                )
            })
        }
        </>
    )
}