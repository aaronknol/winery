import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import StarRating from './StarRating';
import formatToCents from '../utilities';

class EditWine extends React.Component {
    nameInput = React.createRef();
    typeInput = React.createRef();
    priceInput = React.createRef();
    

    constructor(props) {
        super();
        
        this.state = {
            selectedWine : {
                name: '',
                price: '',
                type: '',
                rating: ''
            },
            currentRating: ''
        }
    }

    componentDidMount() {
        Object.keys(this.props.wines).map( key => {
            if (key === this.props.match.params.wineId) {
                this.setState({
                    selectedWine: this.props.wines[key],
                    currentRating: this.props.wines[key].rating
                });
            }
        });
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        
        const nameValue = this.nameInput.current.value;
        const typeValue = this.typeInput.current.value;
        const priceValue = this.priceInput.current.value;
        
        const newWine = {
            name: nameValue,
            type: typeValue,
            price: formatToCents(parseFloat(priceValue)),
            rating: this.state.currentRating
        };

        this.props.updateWine(this.props.match.params.wineId, newWine);
        this.props.history.push('/');
    }

    ratingSelected = (selected) => {
        this.setState({
            currentRating: selected
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <fieldset>
                    <h1>Edit wine</h1>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            ref={this.nameInput}
                            type="text" 
                            id="name"
                            value={this.state.selectedWine.name}
                            onChange={this.onChangeHandler} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select 
                            id="type"
                            ref={this.typeInput}
                            value={this.state.selectedWine.type}
                            onChange={this.onChangeHandler}>
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
                                ref={this.priceInput}
                                type="text" 
                                id="price"
                                value={this.state.selectedWine.price}
                                onChange={this.onChangeHandler}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <h2>Rating</h2>
                        
                        <StarRating
                            numberOfStars="5"
                            onClick={this.ratingSelected}
                            value={this.state.currentRating}
                            onChange={this.onChangeHandler}>
                        </StarRating>
                    </div>

                    <button type="submit">Save changes</button>
                </fieldset>
            </form>
        );
    }
}

export default withRouter(EditWine);