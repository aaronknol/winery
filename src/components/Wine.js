import React, { Fragment } from 'react';

class Wine extends React.Component {
    render() {
        return (
            <Fragment>
                <td>
                    { this.props.wine.name }
                </td>
                <td>
                    { this.props.wine.type }
                </td>
                <td>
                    { this.props.wine.rating }
                </td>
            </Fragment>
        );
    };
};

export default Wine;