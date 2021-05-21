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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage);
  }

  findPalette(id) {
    return this.state.palettes.find(palette => {
      return palette.id === id;
    });
  }

  deletePalette(id) {
    this.setState(st => (
      {palettes: st.palettes.filter(palette => palette.id !== id)}
    ), this.syncLocalStorage);
  }

  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
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
            <PaletteList 
              palettes={this.state.palettes} 
              deletePalette={this.deletePalette} 
              {...routeProps}
            />
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
