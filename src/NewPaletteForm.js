import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorBox from './DraggableColorBox';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

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
  },
  boxes: {
    height: "100%",
    display: "flex", 
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginTop: "1.3rem"
  }
});

class NewPaletteForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currentColor: '',
            colors: [{color: '#C32626', name: 'matte red'}],
            newColorName: "",
            newPaletteName: ""
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
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
      ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
        this.props.palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
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

    handleSubmit() {
      let newName = this.state.newPaletteName;
      const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, "-"),
        colors: this.state.colors
      };
      this.props.savePalette(newPalette);
      this.props.history.push("/");
    }

    render() {
    const { classes} = this.props;
    const { open } = this.state;

    return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={this.handleSubmit} autoComplete="off">
                      <TextValidator 
                        value={this.state.newPaletteName}
                        label="Palette Name"
                        name="newPaletteName"
                        onChange={this.handleChange}
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['Enter Palette Name', 'Name already used']}
                      />
                    <Button variant="contained" color="primary" type="submit">
                      Save Palette
                    </Button>
                    </ValidatorForm>
                    </Toolbar>
                </AppBar>
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
                        <Button variant="contained" color="secondary">Clear Palette</Button>
                        <Button variant="contained" color="primary">Random Color</Button>
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
                      >
                        ADD COLOR
                      </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div className={classes.boxes}>
                    {this.state.colors.map(c => {
                      return <DraggableColorBox color={c.color} name={c.name}/>
                    })}
                    </div>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);