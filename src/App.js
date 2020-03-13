import React from 'react';
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

  deleteWine = (key) => {
    // Take a copy of state
    const wines = { ...this.state.wines };

    wines[key] = null;

    // Set new wine object to state
    this.setState({
      wines: wines
    });
  }

  sortWines = () => {
    // Take a copy of state
    const sorted = {};
    const wines = { ...this.state.wines };

    Object
      .keys(this.state.wines).sort((a, b) => {
        // return props.wines[b].name - props.wines[a].name;
        if (this.state.wines[a].name < this.state.wines[b].name) {
          return -1;
        }
                
        if (this.state.wines[a].name > this.state.wines[b].name) {
          return 1;
        }
            
        // names must be equal
        return 0;
      }
    )
    .forEach((key) => {
      sorted[key] = wines[key];   
    });

    var loopIndex = 0;
    Object.keys(this.state.wines).forEach( () => {
      wines[Object.keys(wines)[loopIndex]] = sorted[Object.keys(sorted)[loopIndex]];
      loopIndex = loopIndex + 1;
    });

    this.setState({
      wines: wines
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WineList wines={this.state.wines} deleteWine={this.deleteWine} sortWines={this.sortWines}></WineList>
          </Route>
          {/* <Route path="/edit/:wineId" component={EditWine}></Route> */}
          <Route path="/edit/:wineId">
            <EditWine wines={this.state.wines} updateWine={this.updateWine}></EditWine>
          </Route>
          <Route path="/add" ><AddWine addWine={this.addWine}></AddWine></Route> 
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
