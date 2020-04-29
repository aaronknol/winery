import * as React from 'react';

interface IProps {
    key: string,
    index: string,
    wine: {},
    render ?: () => React.ReactNode,
    children : any
}

function Wine(props: IProps): React.ReactNode {
    if (props.render) {
        return (
        
            props.render()
        )
    }
}

export default Wine;