import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';
import AddWine from './AddWine';

function WineList (props) {
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
                    Object.keys(props.wines).map(key => (
                        <Wine 
                            key={key} 
                            index={key} 
                            wine={props.wines[key]}
                            render={ () => (
                                <tr>
                                    <td>{props.wines[key].name}</td>
                                    <td>{props.wines[key].type}</td>
                                    <td>{formatPrice(props.wines[key].price)}</td>
                                    <td>{props.wines[key].rating}</td>
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

export default WineList;