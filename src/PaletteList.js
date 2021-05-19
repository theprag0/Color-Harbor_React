import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component{
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {palettes, classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Color Harbor</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => {
                            return (
                                <MiniPalette 
                                    {...palette} 
                                    handleClick={() => this.goToPalette(palette.id)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);