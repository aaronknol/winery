import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import database from './database';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
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

  updateWine = (key, wine) => {
    // Take a copy of state
    const wines = { ...this.state.wines };
    console.log(wine);

    // Add new wine to wine variable
    wines[key] = wine;

    // Set new wine object to state
    this.setState({
      wines: wines
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <WineList wines={this.state.wines}></WineList> } ></Route>
          {/* <Route path="/edit/:wineId" component={EditWine}></Route> */}
          <Route path="/edit/:wineId" render={ (props) => <EditWine {...props} wines={this.state.wines} updateWine={this.updateWine}></EditWine>}></Route>
          <Route path="/add" render={ (props) => <AddWine addWine={this.addWine}></AddWine> }></Route> 
        </Switch>
      </BrowserRouter>

      // <Fragment>
      //   <AddWine addWine={this.addWine}></AddWine>
      //   <hr />
      //   <WineList wines={this.state.wines}></WineList>
      // </Fragment>
    );
  }
}

export default App;
