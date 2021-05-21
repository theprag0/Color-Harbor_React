import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PaletteFormNav from './PaletteFormNav';
import DraggableColorList from './DraggableColorList';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
});

class NewPaletteForm extends Component{
    static defaultProps = {
      maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currentColor: '',
            colors: this.props.palettes[0].colors,
            newColorName: "",
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }
    
    componentDidMount() {
      ValidatorForm.addValidationRule("isColorNameUnique", value =>
        this.state.colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
      );
      ValidatorForm.addValidationRule("isColorUnique", value =>
        this.state.colors.every(
          ({ color }) => color !== this.state.currentColor
        )
      );
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };
    
    handleDrawerClose() {
        this.setState({ open: false });
    };
    
    handleColorChange(newColor) {
        this.setState({currentColor: newColor.hex});
    }

    addNewColor() {
      let newColor = {color: this.state.currentColor, name: this.state.newColorName}
      this.setState({colors : [...this.state.colors, newColor], newColorName: ""});
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit(newPaletteName) {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, "-"),
        colors: this.state.colors
      };
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
      let rand = Math.floor(Math.random() * allColors.length);
      let randomColor = allColors[rand];
      this.setState({colors: [...this.state.colors, randomColor]});
    }

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
                  classes={classes} 
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
                    <Typography variant="h4">
                        Design Your Palette
                    </Typography>
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.clearPalette}>
                          Clear Palette
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={this.addRandomColor} 
                          disabled={paletteIsFull}
                        >
                          Random Color
                        </Button>
                    </div>
                    <ChromePicker color={this.state.currentColor} onChangeComplete={this.handleColorChange}/>
                    <ValidatorForm
                      ref="form"
                      onSubmit={this.addNewColor}
                      autoComplete="off"
                    >
                      <TextValidator
                          onChange={this.handleChange}
                          name="newColorName"
                          label="Color Name"
                          value={this.state.newColorName}
                          validators={['required', 'isColorNameUnique', 'isColorUnique']}
                          errorMessages={
                            ['this field is required', 
                            'Color name must be unique',
                            'Color already used!'
                          ]}
                      />
                      <Button 
                        variant="contained" 
                        color="primary"
                        style={{backgroundColor: this.state.currentColor}}
                        type="submit"
                        disabled={paletteIsFull}
                      >
                        {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
                      </Button>
                    </ValidatorForm>
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
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);