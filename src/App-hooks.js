import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import database from './database';
import { database } from './firebase';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
import WineList from './components/WineList';
import './App.css';


function App () {
  const [wines, setWines] = useState({
    'wines': {}
  });
  const ref = database.ref('/wines');

  useEffect(() => {console.log('firing')
    const handleNewData = snap => {    
      if (snap.val()) {
         setWines({
           wines: snap.val()
         });
      }
    }

    ref.on('value', handleNewData);

    return () => {
      ref.off('value', handleNewData);
    }
  }, [ref.snap]);

  useEffect(() => {
    if (Object.keys(wines.wines).length > 0) {
      console.log('wines: ', wines);
      Object.keys(wines.wines).forEach((wine) => {
        console.log(wine);
        // ref.set({
        //   wine: wine
        // });
      });
    }
  }, [wines]);

  const addWine = (wine) => {
    // Take a copy of state
    const addWines = { wines };

    // Add new wine to wine variable
    addWines[`wine${Date.now()}`] = wine;

    // Set new wine object to state
    setWines({
      wines: addWines
    })
  };

  const updateWine = (key, wine) => {
    // Take a copy of state
    const updateWines = wines.wines;

    // Add new wine to wine variable
    updateWines[key] = wine;

    // Set new wine object to state
    // this.setState({
    //   wines: wines
    // });
    console.log(updateWines);
    setWines(prevState => {
      return {
        wines: updateWines
      }
    });
  }

  const deleteWine = (key) => {
    // Take a copy of state
    const deleteWines = wines.wines;
    delete deleteWines[key];
    // Set new wine object to state
    setWines(prevState => {
      return {
        wines: deleteWines
      }
    });
  }

  const sortWines = () => {
    // Take a copy of state
    const sorted = {};
    // const wines = { wines };

    Object
      .keys(wines).sort((a, b) => {
        // return props.wines[b].name - props.wines[a].name;
        if (wines[a].name < wines[b].name) {
          return -1;
        }
                
        if (wines[a].name > wines[b].name) {
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
    Object.keys(wines).forEach( () => {
      wines[Object.keys(wines)[loopIndex]] = sorted[Object.keys(sorted)[loopIndex]];
      loopIndex = loopIndex + 1;
    });

    // setWines({
    //   wines: wines
    // });

    // this.setState({
    //   wines: wines
    // });
  }

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WineList wines={wines.wines} deleteWine={deleteWine} sortWines={sortWines}></WineList>
          </Route>
          {/* <Route path="/edit/:wineId" component={EditWine}></Route> */}
          <Route path="/edit/:wineId">
            <EditWine wines={wines.wines} updateWine={updateWine}></EditWine>
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
