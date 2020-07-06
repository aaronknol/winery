import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wine from './Wine';
import { formatPrice } from '../utilities';
import { MoreIcon, DeleteIcon } from "../icons";

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

const WineList:React.FunctionComponent<IProps> = (props: IProps) => {

    return (
        <Fragment>
            <Link to='/add' className="btn btn--primary">Add</Link>

            <table>
                <thead>
                    <tr>
                        <th>
                            <button className="btn btn--unstyled" type="button" onClick={ (e) => {props.sortWines('name', 'lowest')} }>
                                Name
                            </button>
                        </th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>
                            <button className="btn btn--unstyled" type="button" onClick={ (e) => {props.sortWines('rating', 'highest')} }>
                                Rating
                            </button>
                        </th>
                        <th>Delete</th>
                        <th>More</th>
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
                                            <td>
                                                <Link to={`/edit/${index}`}>{wine.name}</Link>
                                            </td>
                                            <td>{wine.type}</td>
                                            <td className="text-align--right">{formatPrice(wine.price)}</td>
                                            <td className="text-align--right">{wine.rating}</td>
                                            <td>
                                                <button type="button" onClick={ () => props.deleteWine(wine.key) }>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                            <td>
                                                <MoreIcon />
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