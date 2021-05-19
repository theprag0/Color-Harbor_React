import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
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
        <Route 
          exact 
          path="/" 
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps}/>
          )}
        />
        <Route 
          exact 
          path="/palette/:name" 
          render={(routeProps) => <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.name)
            )}
          />}
        />
        <Route 
          exact 
          path="/palette/:paletteId/:colorId" 
          render={(routeProps) => <SingleColorPalette palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )}
            colorId={routeProps.match.params.colorId}
          />}
        />
      </Switch>
    );
  }
}

export default App;
