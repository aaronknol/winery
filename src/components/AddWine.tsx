import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StarRating from './StarRating';
import TakePhoto from './TakePhoto';
import { formatToCents } from '../utilities';

type Wine = {
    name: string,
    price: string,
    type: string,
    rating: string,
    image?: string
}

interface IProps extends RouteComponentProps<{}> {
    addWine: (wine: Wine) => {},
    deleteWine: (wine: {}) => {},
    wines: Array<{key: string, name: string, rating: number, price: string, type: string}>,
    history: any
}

const AddWine:React.FunctionComponent<IProps> = (props: IProps) => {
    const [wine, setWine] = useState({
        name: '',
        price: '',
        type: 'red',
        rating: '',
        image: ''
    });

    const [takePhoto, setTakePhoto] = useState(false);
    
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        wine.price = formatToCents(wine.price);
        console.log('ive just it to ', wine.price);
        props.addWine(wine);
        props.history.push('/');
    }

    const onChangeHandler = (event: React.FormEvent) => {
        let target = event.target as HTMLInputElement;

        if (event.target && target.name === 'name') {
            setWine(({
                ...wine,
                name: target.value
            }));
        } else if (target.name === 'type') {
            setWine({
                ...wine,
                type:target.value
            });
        } else if (target.name === 'price') {
            setWine({
                ...wine,
                price: target.value
            });
        }
    }

    const ratingSelected = (selected: string) => {
        setWine({
            ...wine,
            rating: selected
        });
    }

    const setWineImage = (imageSource: string) => {
        setWine({
            ...wine,
            image: imageSource
        });
        setTakePhoto(false);
    }

    const handleTakePhoto = () => {
        if (takePhoto) {
            setTakePhoto(false);
        } else {
            setTakePhoto(true);
        }
    }

    return (
        <>
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

                    <button type="button" onClick={handleTakePhoto}>Take photo</button>
                    <button type="submit">Add wine</button>
                </fieldset>
            </form>

            {
                takePhoto && <TakePhoto className="take-photo" setWineImage={setWineImage}></TakePhoto>
            }

            {
                wine.image && <img src={wine.image} alt={wine.name} className="photo" />
            }
        </>
    );
}

export default withRouter(AddWine);