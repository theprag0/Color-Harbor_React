import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            format: "hex",
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({format: e.target.value, open: true});
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({open: false})
    }

    render() {
        const {level, changeLevel, showingAllColors, classes} = this.props;
        const {format, open} = this.state;
        return(
            <nav className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">colorharbor</Link>
                </div>
                { showingAllColors &&
                    <div className="slider-container">
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange} style={{fontSize: "0.85rem"}}>
                        <MenuItem value="hex" style={{fontSize: "0.85rem"}}>HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb" style={{fontSize: "0.85rem"}}>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba" style={{fontSize: "0.85rem"}}>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                    ContentProps={
                        {"aria-describedby": "message-id"}
                    }
                    action={
                        <IconButton 
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </nav>
        )
    }
}

export default withStyles(styles)(Navbar);