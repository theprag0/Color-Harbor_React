import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';
import seedColors from './seedColors';
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component{
    static defaultProps = {
      maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: seedColors[0].colors,
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };
    
    handleDrawerClose() {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
      this.setState({colors : [...this.state.colors, newColor]});
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit(newPalette) {
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = this.state.colors;
      this.props.savePalette(newPalette);
      this.props.history.push("/");
    }

    deleteColor(colorName) {
      this.setState({
        colors: this.state.colors.filter(c => c.name !== colorName)
      });
    }

    clearPalette() {
      this.setState({colors: []});
    }

    addRandomColor() {
      const allColors = this.props.palettes.map(p => p.colors).flat();
      let rand;
      let randomColor;
      let colorIsDuplicate = true;
      while(colorIsDuplicate) {
        rand = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[rand];
        colorIsDuplicate = this.checkDuplicateColor(randomColor.name);
      }
      this.setState({colors: [...this.state.colors, randomColor]});
    }

    checkDuplicateColor(colorName){                         
      return this.state.colors.some(color => color.name === colorName);    
    };

    onSortEnd({oldIndex, newIndex}) {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    render() {
    const { classes, maxColors, palettes} = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors; 

    return (
            <div className={classes.root}>
                <PaletteFormNav  
                  open={open} 
                  palettes={palettes}
                  handleSubmit={this.handleSubmit}
                  handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon /> 
                    </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                      <Typography variant="h4" gutterBottom>
                          Design Your Palette
                      </Typography>
                      <div className={classes.buttons}>
                          <Button variant="contained" color="secondary" onClick={this.clearPalette} className={classes.button}>
                            Clear Palette
                          </Button>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.addRandomColor} 
                            disabled={paletteIsFull}
                            className={classes.button}
                          >
                            Random Color
                          </Button>
                      </div>
                      <ColorPickerForm 
                        paletteIsFull={paletteIsFull} 
                        addNewColor={this.addNewColor} 
                        colors={colors}
                      />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList 
                      colors={colors} 
                      deleteColor={this.deleteColor}
                      onSortEnd={this.onSortEnd}
                      axis="xy"
                      distance={10}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);