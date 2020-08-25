import React, { FormEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import StarRating from './StarRating';
import TakePhoto from './TakePhoto';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatPrice, formatToCents } from '../utilities';
import { Wine } from '../interfaces';



interface IProps extends RouteComponentProps<{wineId: string}> {
    wines: Array<Wine>,
    updateWine: (key: string, wine: Wine) => {},
    history: any,
    getWineFromID: () => Wine
}

const EditWine:React.FunctionComponent<IProps> = (props) => {

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
        const theWine = props.getWineFromID();

        setSelectedWine(theWine);
        setCurrentRating(theWine.rating);

    }, []);

    const setWineImage = (imageSource: string) => {

        setSelectedWine({
            ...selectedWine,
            image: imageSource
        });
        setTakePhoto(false);
    }
    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        
        if (selectedWine.price !== null) {
            
            setSelectedWine({
                ...selectedWine,
                price: selectedWine.price
            });
        }
        
        const newWine = {
            key: selectedWine.key,
            name: selectedWine.name,
            type: selectedWine.type,
            price: selectedWine ? selectedWine.price.toString() : '',
            rating: currentRating,
            image: selectedWine.image
        };

        console.log('new wine ', newWine.price);

        props.updateWine(newWine.key, newWine);
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
                price: formatToCents(target.value)
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
                            value={formatPrice(selectedWine.price)}
                            onChange={onChangeHandler}
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
export default EditWine;
// export default withRouter(EditWine);
