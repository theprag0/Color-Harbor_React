import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
    this.savePalette = this.savePalette.bind(this);
  }

  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]});
  }

  findPalette(id) {
    return this.state.palettes.find(palette => {
      return palette.id === id;
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={(routeProps) => 
            <NewPaletteForm 
              savePalette={this.savePalette} 
              palettes={this.state.palettes} 
              {...routeProps}
            />}
        />
        <Route 
          exact 
          path="/" 
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} {...routeProps}/>
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
