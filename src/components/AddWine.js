import React from 'react';
import StarRating from './StarRating';

class AddWine extends React.Component {
    nameInput = React.createRef();
    typeInput = React.createRef();
    wineForm = React.createRef();

    submitHandler = (e) => {
        e.preventDefault();
        
        const nameValue = this.nameInput.current.value;
        const typeValue = this.typeInput.current.value;
        const ratingValue = e.target.elements.rating.value;
        
        const newWine = {
            name: nameValue,
            type: typeValue,
            rating: ratingValue
        };

        this.props.addWine(newWine);
    }

    render() {
        return (
            <form onSubmit={this.submitHandler} ref={this.wineForm}>
                <fieldset>
                    <h1>Add a new wine</h1>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            ref={this.nameInput}
                            type="text" 
                            id="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select 
                            id="type"
                            ref={this.typeInput}>
                            <option value="red">Red</option>
                            <option value="white">White</option>
                            <option value="rosé">Rosé</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <h2>Rating</h2>
                        
                        <StarRating
                            numberOfStars="12">
                        </StarRating>
                    </div>

                    <button type="submit">Add wine</button>
                </fieldset>
            </form>
        );
    }
}

export default AddWine;