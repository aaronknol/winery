import React, { useRef, FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StarRating from './StarRating';
import TakePhoto from './TakePhoto';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatPrice } from '../utilities';
import { Wine } from '../interfaces';



interface IProps extends RouteComponentProps<{wineId: string}> {
    wines: Array<Wine>,
    updateWine: (key: string, wine: Wine) => {},
    history: any
}

const EditWine:React.FunctionComponent<IProps> = (props) => {

    const priceRef = useRef<HTMLInputElement>(null);
    

    const [selectedWine, setSelectedWine] = useState({
        key: '',
        name: '',
        price: '',
        type: '',
        rating: 0,
        image: ''
    });
    const [currentRating, setCurrentRating] = useState(0);

    const [takePhoto, setTakePhoto] = useState(false);

    useEffect(() => {
        console.log('its: ', props.wines)
        if (props.wines.length === 0) {

        }
        

        props.wines.map((wine, index) => {
            console.log('index: ', index, ' wineId: ', props.match.params.wineId);
            if (index === parseInt(props.match.params.wineId, 10)) {
                setSelectedWine(wine);
                setCurrentRating(wine.rating);
                // @ts-ignore
                priceRef.current.value = formatPrice(wine.price);
            }
            return null;
        });

    }, [props.wines, props.match.params.wineId]);

    const setWineImage = (imageSource: string) => {

        setSelectedWine({
            ...selectedWine,
            image: imageSource
        });
        setTakePhoto(false);
    }
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const price = priceRef.current;
        
        if (price !== null) {
            console.log('submitting with ', price.value)
            setSelectedWine({
                ...selectedWine,
                price: price.value
            });
        }
// @ts-ignore
        console.log('hey Ive set it to ', formatPrice(price.value))
        
        const newWine = {
            key: selectedWine.key,
            name: selectedWine.name,
            type: selectedWine.type,
            price: price ? price.value.toString() : '',
            rating: currentRating,
            image: selectedWine.image
        };

        console.log('new wine ', newWine.price);

        props.updateWine(newWine.key, newWine);
        props.history.push('/');
    }

    const ratingSelected = (selected: number) => {
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
                <h1>Edit wine</h1>

                <div className="form-group">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="text" 
                        id="name"
                        name="name"
                        value={selectedWine.name}
                        onChange={onChangeHandler} 
                        className="input--text" />
                </div>

                <div className="form-group">
                    <label htmlFor="type" className="label">Type</label>
                    <select 
                        id="type"
                        name="type"
                        value={selectedWine.type}
                        onChange={onChangeHandler}
                        className="input--select">
                        <option value="red">Red</option>
                        <option value="white">white</option>
                        <option value="rose">rose</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="label">Price</label>
                    <div className="input-wrapper">
                        <span className="currency">$</span>
                        <input
                            type="text" 
                            id="price"
                            name="price"
                            defaultValue={selectedWine.price = formatPrice(selectedWine.price)}
                            ref={priceRef}
                            className="input--text input--text-indent"
                            />
                    </div>
                </div>

                <div className="form-group">
                    <h2 className="label">Rating</h2>
                    
                    <StarRating
                        numberOfStars="5"
                        onClick={ratingSelected}
                        value={currentRating}
                        onChange={onChangeHandler}>
                    </StarRating>
                </div>

                {
                    takePhoto && <TakePhoto className="take-photo" setWineImage={setWineImage}></TakePhoto>
                }

                {
                    selectedWine.image && <img src={selectedWine.image} alt={selectedWine.name} className="photo" />
                }
                
                <div className="form__actions">
                    <button type="button" className="btn btn--primary btn--full" onClick={handleTakePhoto}>Take photo</button>
                    <button type="submit" className="btn btn--primary btn--full">Save changes</button>
                </div>
            </fieldset>
        </form>

        
        </>
    );
}

export default withRouter(EditWine);
