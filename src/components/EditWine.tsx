import React, { FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StarRating from './StarRating';
import { useState } from 'react';
import { useEffect } from 'react';

type Wine = {
    name: string,
    price: string,
    type: string,
    rating: string,
    image?: string
}

interface IProps extends RouteComponentProps<{wineId: string}> {
    wines: Array<{key: string, name: string, rating: string, price: string, type: string}>
    updateWine: (key: string, wine: Wine) => {},
    history: any
}

function EditWine (props: IProps) {
    const [selectedWine, setSelectedWine] = useState({
        key: '',
        name: '',
        price: '',
        type: '',
        rating: '',
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
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        
        const newWine = {
            key: selectedWine.key,
            name: selectedWine.name,
            type: selectedWine.type,
            price: selectedWine.price.toString(),
            rating: currentRating
        };

        props.updateWine(newWine.key, newWine);
        props.history.push('/');
    }

    const ratingSelected = (selected: string) => {
        setCurrentRating(selected);
    }

    const onChangeHandler = (event: FormEvent) => {
        let target = event.target as HTMLInputElement;
        console.log('gotta change something! ', target.name, ' ', target.value);
        
        if (target.name === 'name') {
            console.log('the selected wine: ', selectedWine);
            setSelectedWine({
                ...selectedWine,
                name: target.value
            });
        } else if (target.name === 'type') {
            setSelectedWine({
                ...selectedWine,
                type: target.value
            });
        } else if (target.name === 'price') {
            setSelectedWine({
                ...selectedWine,
                price: target.value
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