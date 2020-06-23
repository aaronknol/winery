import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';

type Wine = {
    key : string,
    index: string,
    wine: Wine,
    render: () => {}
}

interface IProps {
    sortWines: (name: string, type: string) => {},
    deleteWine: (wine: {}) => {},
    wines: Array<{key: string, name: string, rating: number, price: number, type: string}>
}

const WineList = (props: IProps) => {

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
                        props.wines.map((wine, index: number) => {
                            return (
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
                            )
                        })
                        
                    }
                </tbody>
            </table>

        </Fragment>
    );
};

export default WineList;