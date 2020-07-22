import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Stars } from './Star';
import SortPanel from './SortPanel';
import { formatPrice } from '../utilities';
import { Wine } from '../interfaces';

interface IProps {
    sortWines: (name: string, type: string) => {},
    deleteWine: (wine: {}) => {},
    wines: Array<Wine>
}

const WineList:React.FunctionComponent<IProps> = (props: IProps) => {
    const [sortVisible, setSortVisible] = React.useState(false);

    const defaultImage = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTUwLjI3LDMuODkyYzAsMCwzLjkxMy0wLjEwMiw0LjIxMiwxLjE1MmwwLjQxNywzLjgyMmwtMC4zNTcsMC41Mzd2MTYuMDY1YzAsMCwwLjEyLDMuNDA0LDMuNDA1LDYuMTUxICBjMCwwLDQuMDAxLDMuNjQzLDQuMDAxLDkuOTE0djQ2Ljk0YzAsMCwwLjExOSw3LjI4NS0zLjg4Miw3LjgyNGMwLDAtMi45NTksMC4yMzgtNy43OTYsMC4yMzhjLTQuODM3LDAtNy43OTQtMC4yMzgtNy43OTQtMC4yMzggIGMtNC4wMDEtMC41MzktMy44ODItNy44MjQtMy44ODItNy44MjR2LTQ2Ljk0YzAtNi4yNzEsNC4wMDEtOS45MTQsNC4wMDEtOS45MTRjMy4yODQtMi43NDcsMy40MDQtNi4xNTEsMy40MDQtNi4xNTFWOS40MDQgIGwtMC4zNTktMC41MzdsMC40MTktMy44MjJDNDYuMzU3LDMuNzkxLDUwLjI3LDMuODkyLDUwLjI3LDMuODkyIj48L3BhdGg+PC9zdmc+';
    
    const sortMethod = ( sortBy:string ) => {
        if (sortBy === 'Price') {
            props.sortWines('price', 'lowest')
        }

        if (sortBy === 'Rating') {
            props.sortWines('rating', 'highest')
        }
    }
    
    return (
        <Fragment>
            <div className="actions">
                <Link to='/add' className="btn btn--primary">Add</Link>

                <button type="button" className="btn btn--primary" onClick={() => {setSortVisible(!sortVisible)}}>
                    Sort
                </button>
                
            </div>
            {
                    sortVisible && <SortPanel sortMethod={sortMethod}></SortPanel>
                }
            {
                props.wines.map((wine, index: number) => {

                    return (
                        <div className="wine" key={wine.key}>
                            
                            <img src={wine.image ? wine.image : defaultImage } alt={wine.image} className="wine__image" />
                            <div className="wine__details">
                                <h2 className="wine__title">{wine.name}</h2>
                                <p className="wine__type-price">
                                    <span className="wine__type">{wine.type}</span>
                                    <span className="wine__price">${formatPrice(wine.price)}</span>
                                </p>
                                <Stars numberOfStars={wine.rating} cssClass="wine__rating" />
                                <div className="wine__actions">
                                    <Link to={`/edit/${index}`} className="btn btn--primary">Edit</Link>
                                    <button type="button" className="btn btn--secondary" onClick={ () => props.deleteWine(wine.key) }>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            {/* <table>
                <thead>
                    <tr>
                        <th>
                            <button className="btn btn--unstyled" type="button" onClick={ (e) => {props.sortWines('name', 'lowest')} }>
                                Name
                            </button>
                        </th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Image</th>
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
                                            <td><img src={wine.image} alt={wine.name} /></td>
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
            </table> */}
        </Fragment>
    );
};

export default WineList;