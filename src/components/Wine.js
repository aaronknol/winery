import React from 'react';

class Wine extends React.Component {
    render() {
        return (
            Object.keys(this.props.wines).map(key => (
                <p>a</p>
            ))
        );
    };
};

export default Wine;