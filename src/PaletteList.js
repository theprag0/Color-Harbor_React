import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PaletteList extends Component{
    render() {
        return (
            <div className="PaletteList">
                {this.props.palettes.map(palette => {
                    return (
                        <p>
                            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
                        </p>
                    );
                })}
            </div>
        );
    }
}

export default PaletteList;