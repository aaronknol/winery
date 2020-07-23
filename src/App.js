import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import database from './database';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
import WineList from './components/WineList';
import { formatToCents } from './utilities';
import './App.css';


class App extends React.Component {

  state = {
    wines: [],
    isLoading: true
  };

 defaultImage = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTUwLjI3LDMuODkyYzAsMCwzLjkxMy0wLjEwMiw0LjIxMiwxLjE1MmwwLjQxNywzLjgyMmwtMC4zNTcsMC41Mzd2MTYuMDY1YzAsMCwwLjEyLDMuNDA0LDMuNDA1LDYuMTUxICBjMCwwLDQuMDAxLDMuNjQzLDQuMDAxLDkuOTE0djQ2Ljk0YzAsMCwwLjExOSw3LjI4NS0zLjg4Miw3LjgyNGMwLDAtMi45NTksMC4yMzgtNy43OTYsMC4yMzhjLTQuODM3LDAtNy43OTQtMC4yMzgtNy43OTQtMC4yMzggIGMtNC4wMDEtMC41MzktMy44ODItNy44MjQtMy44ODItNy44MjR2LTQ2Ljk0YzAtNi4yNzEsNC4wMDEtOS45MTQsNC4wMDEtOS45MTRjMy4yODQtMi43NDcsMy40MDQtNi4xNTEsMy40MDQtNi4xNTFWOS40MDQgIGwtMC4zNTktMC41MzdsMC40MTktMy44MjJDNDYuMzU3LDMuNzkxLDUwLjI3LDMuODkyLDUwLjI3LDMuODkyIj48L3BhdGg+PC9zdmc+';

  
 
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
        wines: data,
        isLoading: false
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

    wine.price = Math.ceil(formatToCents(wine.price)).toString();

    console.log('it is now: ',  wine.price);

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

        if (parseInt(a[sortBy], 10) < parseInt(b[sortBy], 10)) {
          return -1;
        }
                
        if (parseInt(a[sortBy], 10) > parseInt(b[sortBy], 10)) {
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

            {
              this.state.isLoading ? <div className="loading"><img src={this.defaultImage} alt="Loading" className="loading__img" /></div> : (
                <WineList 
                wines={this.state.wines} 
                deleteWine={this.deleteWine} 
                sortWines={this.sortWines}>
              </WineList>
              )
            }

            
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
