import React from 'react';
import Wine from './Wine';

class WineList extends React.Component {
    render() {
        return (
            <Wine wines={this.props.wines}></Wine>
        );
    };
};

export default WineList;