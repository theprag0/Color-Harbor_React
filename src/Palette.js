import React, {Component} from 'react';
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';

class Palette extends Component{
    constructor(props) {
        super(props);
        this.state = {
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(level) {
        this.setState({level});
    }

    render() {
        const {palette} = this.props;
        const {level} = this.state;
        const colorBoxes = palette.colors[level].map(c => (
            <ColorBox background={c.hex} name={c.name}/>
        ));

        return(
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="slider">
                    <Slider 
                        defaultValue={level} 
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* Footer goes here */}
            </div>
        );
    }
}

export default Palette;