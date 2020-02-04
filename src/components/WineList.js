import React from 'react';
import Wine from './Wine';

class WineList extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(this.props.wines).map(key => (
                            <tr key={key}>
                                <Wine key={key} index={key} wine={this.props.wines[key]}></Wine>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    };
};

export default WineList;