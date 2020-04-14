import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import StarRating from './StarRating';
import formatToCents from '../utilities';

function AddWine (props) {
    const [wine, setWine] = useState({
        name: '',
        price: '',
        type: 'red',
        rating: ''
    });
    
    const submitHandler = (e) => {
        e.preventDefault();
        wine.price = formatToCents(wine.price);
        props.addWine(wine);
        props.history.push('/');
    }

    const onChangeHandler = (e) => {
        if (e.target.name === 'name') {
            setWine(({
                ...wine,
                name: e.target.value
            }));
        } else if (e.target.name === 'type') {
            setWine({
                ...wine,
                type: e.target.value
            });
        } else if (e.target.name === 'price') {
            setWine({
                ...wine,
                price: e.target.value
            });
        }
    }

    const ratingSelected = (selected) => {
        setWine({
            ...wine,
            rating: selected
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <fieldset>
                <h1>Add a new wine</h1>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        // ref={this.nameInput}
                        type="text" 
                        id="name"
                        name="name"
                        value={wine.name}
                        onChange={onChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select 
                        id="type"
                        name="type"
                        value={wine.type}
                        onChange={onChangeHandler}>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="rosé">Rosé</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="input-wrapper">
                        <span className="currency">$</span>
                        <input 
                            name="price"
                            type="text" 
                            id="price"
                            value={wine.price}
                            onChange={onChangeHandler} />
                    </div>
                </div>

                <div className="form-group">
                    <h2>Rating</h2>
                    
                    <StarRating
                        numberOfStars="5"
                        onClick={ratingSelected}
                        value={wine.rating}>
                    </StarRating>
                </div>

                <button type="submit">Add wine</button>
            </fieldset>
        </form>
    );
}

export default withRouter(AddWine);