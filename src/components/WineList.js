import React from 'react';
import Wine from './Wine';

class WineList extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Rating</th>
                </tr>
                
                    {
                        Object.keys(this.props.wines).map(key => (
                            <tr>
                                <Wine key={key} index={key} wine={this.props.wines[key]}></Wine>
                            </tr>
                        ))
                    }
                
            </table>
        );
    };
};

export default WineList;