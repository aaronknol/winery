import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';

function WineList (props) {

    return (
        <Fragment>
        <Link to='/add'>Add</Link>

        <table>
            <thead>
                <tr>
                    <th>
                        <button type="button" onClick={ (e) => {props.sortWines('name', 'lowest')} }>
                            Name
                        </button>
                    </th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>
                        <button type="button" onClick={ (e) => {props.sortWines('rating', 'highest')} }>
                            Rating
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(props.wines).map(key => (
                        <Wine 
                            key={props.wines[key].key} 
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
                                    <td>
                                        <button type="button" onClick={ () => props.deleteWine(props.wines[key].key) }>
                                            Delete
                                        </button>
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