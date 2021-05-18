import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
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
        <Route exact path="/" render={() => <PaletteList palettes={seedColors}/>}/>
        <Route 
          exact 
          path="/palette/:name" 
          render={(routeProps) => <Palette palette={generatePalette(
            this.findPalette(routeProps.match.params.name)
          )}
          />}
        />
      </Switch>
    );
  }
}

export default App;
