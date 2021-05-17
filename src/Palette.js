import React, {Component} from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component{
    render() {
        const colorBoxes = this.props.colors.map(c => (
            <ColorBox background={c.color} name={c.name}/>
        ))
        return(
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* Footer goes here */}
            </div>
        );
    }
}

export default Palette;