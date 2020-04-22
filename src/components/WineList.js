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
                    props.wines.map((wine, index) => (
                        <Wine 
                            key={wine.key} 
                            index={wine.key} 
                            wine={wine}
                            render={ () => (
                                <tr>
                                    <td>{wine.name}</td>
                                    <td>{wine.type}</td>
                                    <td>{formatPrice(wine.price)}</td>
                                    <td>{wine.rating}</td>
                                    <td>
                                        <Link to={`/edit/${index}`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button type="button" onClick={ () => props.deleteWine(wine.key) }>
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