import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

class Palette extends Component{
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({level});
    }

    changeFormat(format) {
        this.setState({format});
    }

    render() {
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(c => (
            <ColorBox 
                background={c[format]} 
                name={c.name} 
                key={c.id}
                colorId={c.id}
                paletteId={id}
                showingFullPalette
            />
        ));

        return(
            <div className={classes.Palette}>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);