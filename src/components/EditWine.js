import React from 'react';
import { withRouter } from 'react-router-dom';
import StarRating from './StarRating';
import formatToCents from '../utilities';
import { useState } from 'react';
import { useEffect } from 'react';

function EditWine (props) {
    const [selectedWine, setSelectedWine] = useState({
        name: '',
        price: '',
        type: '',
        rating: '',
        key: ''
    });
    const [currentRating, setCurrentRating] = useState('');

    useEffect(() => {
        console.log('its: ', props.wines)
        if (props.wines.length === 0) {

        }

        props.wines.map((wine, index) => {
            console.log('index: ', index, ' wineId: ', props.match.params.wineId);
            if (index === parseInt(props.match.params.wineId, 10)) {
                setSelectedWine(wine);
                setCurrentRating(wine.rating);
            }
            return null;
        });
    }, [props.wines, props.match.params.wineId]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        const newWine = {
            key: selectedWine.key,
            name: selectedWine.name,
            type: selectedWine.type,
            price: formatToCents(parseFloat(selectedWine.price)),
            rating: currentRating
        };

        props.updateWine(newWine.key, newWine);
        props.history.push('/');
    }

    const ratingSelected = (selected) => {
        setCurrentRating(selected);
    }

    const onChangeHandler = (e) => {
        console.log('gotta change something! ', e.target.name, ' ', e.target.value);
        
        if (e.target.name === 'name') {
            console.log('the selected wine: ', selectedWine);
            setSelectedWine({
                ...selectedWine,
                name: e.target.value
            });
        } else if (e.target.name === 'type') {
            setSelectedWine({
                ...selectedWine,
                type: e.target.value
            });
        } else if (e.target.name === 'price') {
            setSelectedWine({
                ...selectedWine,
                price: e.target.value
            });
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <fieldset>
                <h1>Edit wine</h1>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text" 
                        id="name"
                        name="name"
                        value={selectedWine.name}
                        onChange={onChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select 
                        id="type"
                        name="type"
                        value={selectedWine.type}
                        onChange={onChangeHandler}>
                        <option value="red">Red</option>
                        <option value="white">white</option>
                        <option value="rose">rose</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="input-wrapper">
                        <span className="currency">$</span>
                        <input
                            type="text" 
                            id="price"
                            name="price"
                            value={selectedWine.price}
                            onChange={onChangeHandler}/>
                    </div>
                </div>

                <div className="form-group">
                    <h2>Rating</h2>
                    
                    <StarRating
                        numberOfStars="5"
                        onClick={ratingSelected}
                        value={currentRating}
                        onChange={onChangeHandler}>
                    </StarRating>
                </div>

                <button type="submit">Save changes</button>
            </fieldset>
        </form>
    );
}

export default withRouter(EditWine);