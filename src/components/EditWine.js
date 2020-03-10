import React, { Fragment } from 'react';
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
        rating: ''
    });
    const [currentRating, setCurrentRating] = useState('');
    const [nameValue, setNameValue] = useState('Pepp');

    // const nameInput = React.createRef();
    // const typeInput = React.createRef();
    // const priceInput = React.createRef();

    useEffect(() => {
        Object.keys(props.wines).map( key => {
            if (key === props.match.params.wineId) {
                setSelectedWine(props.wines[key]);
                setCurrentRating(props.wines[key].rating);
            }
        });
    }, []);
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        const nameValue = this.nameInput.current.value;
        const typeValue = this.typeInput.current.value;
        const priceValue = this.priceInput.current.value;
        
        const newWine = {
            name: nameValue,
            type: typeValue,
            price: formatToCents(parseFloat(priceValue)),
            rating: currentRating
        };

        props.updateWine(this.props.match.params.wineId, newWine);
        props.history.push('/');
    }

    const ratingSelected = (selected) => {
        setCurrentRating(selected);
    }

    const onChangeHandler = (e) => {
        console.log('gotta change something! ', e.target.name, ' ', e.target.value);
        
        if (e.target.name === 'name') {console.log('here')
            setSelectedWine(({
                ...selectedWine,
                name: e.target.value
            }));
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
                        // ref={nameInput}
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
                        // ref={typeInput}
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
                            // ref={priceInput}
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