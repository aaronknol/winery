import React from 'react';

class Wine extends React.Component {
    render() {
        return (
            this.props.render()
        );
    };
};

export default Wine;