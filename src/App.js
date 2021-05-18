import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import './App.css';

class App extends Component {
  findPalette(id) {
    return seedColors.find(palette => {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List</h1>}/>
        <Route 
          exact 
          path="/palette/:name" 
          render={(routeProps) => <Palette palette={generatePalette(
            this.findPalette(routeProps.match.params.name)
          )}
          />}
        />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[1])}/>
      // </div>
    );
  }
}

export default App;
