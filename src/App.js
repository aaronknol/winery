import React, { Fragment } from 'react';
import database from './database';
import AddWine from './components/AddWine';
import WineList from './components/WineList';
import './App.css';


class App extends React.Component {

  state = {
    wines: {}
  };
 
  componentDidMount() {
    
    this.ref = database.syncState('/wines', {
      context: this,
      state: 'wines'
    });
    
  }

  addWine = (wine) => {
    // Take a copy of state
    const wines = { ...this.state.wines };

    // Add new wine to wine variable
    wines[`wine${Date.now()}`] = wine;

    // Set new wine object to state
    this.setState({
      wines: wines
    });
  };

  render() {
    return (
      <Fragment>
        <AddWine addWine={this.addWine}></AddWine>
        <hr />
        <WineList wines={this.state.wines}></WineList>
      </Fragment>
    );
  }
}

export default App;
