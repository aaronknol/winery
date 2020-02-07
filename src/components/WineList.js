import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';
import AddWine from './AddWine';

class WineList extends React.Component {
    render() {
        return (
            <Fragment>
            <Link to='/add'>Add</Link>

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
                            <Wine 
                                key={key} 
                                index={key} 
                                wine={this.props.wines[key]}
                                render={ () => (
                                    <tr>
                                        <td>{this.props.wines[key].name}</td>
                                        <td>{this.props.wines[key].type}</td>
                                        <td>{formatPrice(this.props.wines[key].price)}</td>
                                        <td>{this.props.wines[key].rating}</td>
                                        <td>
                                            <Link to={`/edit/${key}`}>Edit</Link>
                                        </td>
                                    </tr>
                            )}>
                            </Wine>
                        ))
                    }
                </tbody>
            </table>
            </Fragment>
        );
    };
};

export default WineList;