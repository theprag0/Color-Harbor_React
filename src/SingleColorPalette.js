import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

const styles = {
    Palette: {
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    },
    colors: { 
        height: "90%", 
        display: "flex", 
        flexWrap: "wrap" 
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        position: "relative",
        cursor: "pointer",
        backgroundColor: "#000",
        "& a": {
            color: "#fff",
            width: "90px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-45px",
            marginTop: "-15px",
            outline: "none",
            border: "none",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            fontSize: "0.9rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            textDecoration: "none",
        }
    }
};

class SingleColorPalette extends Component{
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(k => (
                k.id === colorToFilterBy
            )));
        }
        return shades.slice(1);
    }

    changeFormat(format) {
        this.setState({format});
    }

    render() {
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} =  this.props;
        const {format} = this.state;
        const colorBoxes = this._shades.map(c => {
            return <ColorBox 
                name={c.name}
                background={c[format]}
                key={c.name}
                showingFullPalette={false}
            />
        });
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);