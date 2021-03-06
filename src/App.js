import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import database from './database';
import database from './database';
import AddWine from './components/AddWine';
import EditWine from './components/EditWine';
import WineList from './components/WineList';
import { formatToCents } from './utilities';
import './App.css';


function App () {
  const [wines, setWines] = useState({
    'wines': []
  });
  const [isLoading, setIsLoading] = useState(true);

  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTUwLjI3LDMuODkyYzAsMCwzLjkxMy0wLjEwMiw0LjIxMiwxLjE1MmwwLjQxNywzLjgyMmwtMC4zNTcsMC41Mzd2MTYuMDY1YzAsMCwwLjEyLDMuNDA0LDMuNDA1LDYuMTUxICBjMCwwLDQuMDAxLDMuNjQzLDQuMDAxLDkuOTE0djQ2Ljk0YzAsMCwwLjExOSw3LjI4NS0zLjg4Miw3LjgyNGMwLDAtMi45NTksMC4yMzgtNy43OTYsMC4yMzhjLTQuODM3LDAtNy43OTQtMC4yMzgtNy43OTQtMC4yMzggIGMtNC4wMDEtMC41MzktMy44ODItNy44MjQtMy44ODItNy44MjR2LTQ2Ljk0YzAtNi4yNzEsNC4wMDEtOS45MTQsNC4wMDEtOS45MTRjMy4yODQtMi43NDcsMy40MDQtNi4xNTEsMy40MDQtNi4xNTFWOS40MDQgIGwtMC4zNTktMC41MzdsMC40MTktMy44MjJDNDYuMzU3LDMuNzkxLDUwLjI3LDMuODkyLDUwLjI3LDMuODkyIj48L3BhdGg+PC9zdmc+';
  // const ref = database.ref('/wines');

  useEffect(() => {
    console.log('firing');

    database.fetch('/wines', {
      context: this,
      asArray: true
    }).then((data) => {
      console.log('data: ', data);
      setWines([
        ...data
      ]);
      setIsLoading(false);
    });

    // const handleNewData = snap => {    
    //   if (snap.val()) {
    //      setWines({
    //        wines: snap.val()
    //      });
    //   }
    // }

    // ref.on('value', handleNewData);

    // return () => {
    //   ref.off('value', handleNewData);
    // }
  }, []);

  const addWine = (wine) => {
    database.push('wines', {
      data: wine
    }).then(newLocation => {
      var generatedKey = newLocation.key;
      wine.key = generatedKey;
   
      setWines([
        ...wines,
        wine
      ])
      console.log("WINES: ", wines);

    }).catch(err => {
      //handle error
    });
    //available immediately, you don't have to wait for the Promise to resolve
    // var generatedKey = immediatelyAvailableReference.key;
  };

  const updateWine = (key, wine) => {
    console.log('key: ', key)
    // Take a copy of state
    const copyOfWines = [ ...wines ];

    const objIndex = copyOfWines.findIndex((element => element.key === key));
    copyOfWines[objIndex] = wine;

    // wine.price = Math.ceil(formatToCents(wine.price)).toString();
    wine.price = formatToCents(wine.price).toString();

    console.log('it is now: ',  wine.price);

    // Set new wine object to state
    setWines([
      ...copyOfWines
    ]);

    database.update('/wines/' + key, {
      data: { ...wine }
    }).then( () => {
      console.log('updated it!');
    });
  }

  const deleteWine = (key) => {
    
    //Take a copy of state
    let copyOfWines = [ ...wines ];
    const index = wines.findIndex((item) => item.key === key);

    if (index >= 0) {
      copyOfWines.splice(index, 1);
    }

    setWines([
      ...copyOfWines
    ]);

    database.update('/wines/' + key, {
      data: {name: null, price: null, rating: null, type: null, key: null, image: null}
    }).then( () => {
      console.log('deleted it!');
    });
  }

  const sortWines = (sortBy, method) => {
    // // Take a copy of state
    const copyOfWines = [ ...wines ];

    copyOfWines.sort((a, b) => {
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

    setWines([
      ...copyOfWines
    ]);
  }

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">

        {
          isLoading ? <div className="loading"><img src={defaultImage} alt="Loading" className="loading__img" /></div> : (
            <WineList 
              wines={wines} 
              deleteWine={deleteWine} 
              sortWines={sortWines}>
          </WineList>
          )
        } 
      </Route>
      <Route path="/edit/:wineId">
        <EditWine 
          wines={wines} 
          updateWine={updateWine}>
        </EditWine>
      </Route>
      <Route path="/add" ><AddWine addWine={addWine}></AddWine></Route> 
    </Switch>
  </BrowserRouter>


    // <Fragment>
    //   <AddWine addWine={addWine}></AddWine>
    //   <hr />
    //   <WineList wines={wines}></WineList>
    // </Fragment>
  );
}

export default App;
