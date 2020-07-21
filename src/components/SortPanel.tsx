import * as React from 'react';

export interface IProps {
    sortMethod: (sortBy:string) => void
}

const SortPanel: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <div className="sort-panel">
            <h2>Sort by: </h2>
            <div className="sort-panel__btns">
                <button type="button" className="btn btn--text" onClick={() => {props.sortMethod('Price')}}>Price</button>
                <button type="button" className="btn btn--text" onClick={() => {props.sortMethod('Rating')}}>Rating</button>
            </div>
        </div>
    )
}

export default SortPanel;