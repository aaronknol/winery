import React from 'react';

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
                        
                        <label htmlFor="rating-1">1</label>
                        <input type="radio" name="rating" id="rating-1" value="1" />

                        <label htmlFor="rating-2">2</label>
                        <input type="radio" name="rating" id="rating-2" value="2" />

                        <label htmlFor="rating-3">3</label>
                        <input type="radio" name="rating" id="rating-3" value="3" />

                        <label htmlFor="rating-4">4</label>
                        <input type="radio" name="rating" id="rating-4" value="4" />

                        <label htmlFor="rating-5">5</label>
                        <input type="radio" name="rating" id="rating-5" value="5" />
                    </div>

                    <button type="submit">Add wine</button>
                </fieldset>
            </form>
        );
    }
}

export default AddWine;