import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import database from './database';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
import WineList from './components/WineList';
import './App.css';


function App () {

  const [wines, setWines] = useState('');
  const mySetWines = ({ wines }) => setWines({ ...wines });

  useEffect(() => {
    const ref = database.syncState('/wines', {
      context: {
        setState: mySetWines,
        state: wines
      },
      state: 'wines'
    });


  }, []);

  const addWine = (wine) => {
    
    // Add new wine to wine variable
    wines[`wine${Date.now()}`] = wine;

    // Set new wine object to state
    setWines(
      ...wines,
      wine
    );

  };

  const updateWine = (key, wine) => {
    // Take a copy of state
    // const wines = { ...this.state.wines };
    // console.log(wine);

    // Add new wine to wine variable
    // wines[key] = wine;
    const dummyWines = wines;

    Object.keys(wines).map( loopedWine => {
      if (key === loopedWine) {
        dummyWines[key] = wine
      }
    });

    setWines(dummyWines);
    console.log('wines: ', wines);

    // setWines(
    //   ...wines,
    //   wine
    // )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WineList wines={wines}></WineList>
        </Route>
        {/* <Route path="/edit/:wineId" component={EditWine}></Route> */}
        <Route path="/edit/:wineId">
          <EditWine wines={wines} updateWine={updateWine}></EditWine>
        </Route>
        <Route path="/add" ><AddWine addWine={addWine}></AddWine></Route> 
      </Switch>
    </BrowserRouter>

    // <Fragment>
    //   <AddWine addWine={this.addWine}></AddWine>
    //   <hr />
    //   <WineList wines={this.state.wines}></WineList>
    // </Fragment>
  );
}

export default App;
