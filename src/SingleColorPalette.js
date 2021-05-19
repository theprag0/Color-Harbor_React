import React, {Component} from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component{
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        console.log(this._shades);
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

    render() {
        const colorBoxes = this._shades.map(c => {
            return <ColorBox 
                name={c.name}
                background={c.hex}
                key={c.id}
                showLink={false}
            />
        });
        return (
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}

export default SingleColorPalette;