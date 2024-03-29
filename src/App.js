import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import {generatePalette} from './colorHelpers';
import seedColors from './seedColors';

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
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route exact path="/palette/new" render={(routeProps) => 
                  <Page>
                    <NewPaletteForm 
                      savePalette={this.savePalette} 
                      palettes={this.state.palettes} 
                      {...routeProps}
                    />
                  </Page>
                  }
              />
              <Route 
                exact 
                path="/" 
                render={(routeProps) => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path="/palette/:name" 
                render={(routeProps) => (
                  <Page>
                    <Palette palette={generatePalette(
                        this.findPalette(routeProps.match.params.name)
                      )}
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path="/palette/:paletteId/:colorId" 
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}
              />
              <Route  
                render={(routeProps) => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}

export default App;
