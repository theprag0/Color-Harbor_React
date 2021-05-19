import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

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
        const {format} = this.state;
        const colorBoxes = this._shades.map(c => {
            return <ColorBox 
                name={c.name}
                background={c[format]}
                key={c.name}
                showLink={false}
            />
        });
        return (
            <div className="SingleColorPalette Palette">
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default SingleColorPalette;