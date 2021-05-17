import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
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
                <Navbar level={level} changeLevel={this.changeLevel}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* Footer goes here */}
            </div>
        );
    }
}

export default Palette;