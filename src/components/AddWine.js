import React from 'react';
import StarRating from './StarRating';

class AddWine extends React.Component {
    nameInput = React.createRef();
    typeInput = React.createRef();
    priceInput = React.createRef();

    constructor() {
        super();
        
        this.state = {
            selectedRating: null
        }
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        
        const nameValue = this.nameInput.current.value;
        const typeValue = this.typeInput.current.value;
        const priceValue = this.priceInput.current.value;
        
        const newWine = {
            name: nameValue,
            type: typeValue,
            price: priceValue,
            rating: this.state.selectedRating
        };

        this.props.addWine(newWine);
    }

    ratingSelected = (selected) => {
        this.setState({
            selectedRating: selected
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
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
                        <label htmlFor="price">Price</label>
                        <div class="input-wrapper">
                            <span class="currency">$</span>
                            <input 
                                ref={this.priceInput}
                                type="text" 
                                id="price" />
                        </div>
                    </div>

                    <div className="form-group">
                        <h2>Rating</h2>
                        
                        <StarRating
                            numberOfStars="5"
                            onClick={this.ratingSelected}>
                        </StarRating>
                    </div>

                    <button type="submit">Add wine</button>
                </fieldset>
            </form>
        );
    }
}

export default AddWine;