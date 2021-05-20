import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        position: "relative",
        cursor: "pointer",
        display: "inline-block"
    }
};

function DraggableColorBox(props) {
    const {classes, color, name} = props;
    return(
        <div className={classes.root} style={{backgroundColor: color}}>
            {name}
        </div>
    );
}

export default withStyles(styles)(DraggableColorBox);