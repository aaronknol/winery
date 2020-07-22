import * as React from 'react';

export interface IProps {
    wine: {},
    index: string,
    render?: () => React.ReactNode,
    children?: JSX.Element
}

const Wine: React.FunctionComponent<IProps> = (props: IProps)  => {
    return (
        <>
            {props.render && props.render()}
        </>
    )
}

export default Wine;