import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import database from './database';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
import WineList from './components/WineList';
import './App.css';


class App extends React.Component {

  state = {
    wines: []
  };
 
  componentDidMount() {
    
    // this.ref = database.syncState('/wines', {
    //   context: this,
    //   state: 'wines',
    //   asArray: true
    // });
    
    database.fetch('/wines', {
      context: this,
      asArray: true
    }).then((data) => {
      this.setState({
        wines: data
      });
    });

  }

  addWine = (wine) => {
    database.push('wines', {
      data: wine
    }).then(newLocation => {
      var generatedKey = newLocation.key;
      // Take a copy of state
      const wines = [ ...this.state.wines ];
      wine.key = generatedKey;
   
      wines.push(wine);
    
      // update state
      this.setState({
        wines: wines
      });
      console.log("WINES: ", wines);

    }).catch(err => {
      //handle error
    });
    //available immediately, you don't have to wait for the Promise to resolve
    // var generatedKey = immediatelyAvailableReference.key;
  };

  updateWine = (key, wine) => {
    console.log('key: ', key)
    // Take a copy of state
    const wines = [ ...this.state.wines ];

    const objIndex = wines.findIndex((element => element.key === key));
    wines[objIndex] = wine;

    // Set new wine object to state
    this.setState({
      wines: wines
    });

    database.update('/wines/' + key, {
      data: { ...wine }
    }).then( () => {
      console.log('updated it!');
    });
  }

  deleteWine = (key) => {
    // Take a copy of state
    let wines = [ ...this.state.wines ];
    // remove the wine with key that's been passed in
    wines = wines.filter(item => item.key !== key);

    // Set new wine object to state
    this.setState({
      wines: wines
    });

    database.update('/wines/' + key, {
      data: {name: null, price: null, rating: null, type: null, key: null, image: null}
    }).then( () => {
      console.log('deleted it!');
    });
  }

  sortWines = (sortBy, method) => {
    console.log('sortyBy: ', sortBy)
    // // Take a copy of state
    const wines = [ ...this.state.wines ];

    wines.sort((a, b) => {
      if (method === 'highest') {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
                
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        // names must be equal
        return 0;

      } else {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
                
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }

        // names must be equal
        return 0;
      }
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
            <WineList 
              wines={this.state.wines} 
              deleteWine={this.deleteWine} 
              sortWines={this.sortWines}>
            </WineList>
          </Route>
          <Route path="/edit/:wineId">
            <EditWine 
              wines={this.state.wines} 
              updateWine={this.updateWine}>
            </EditWine>
          </Route>
          <Route path="/add" ><AddWine addWine={this.addWine}></AddWine></Route> 
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
