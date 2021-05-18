import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: "0.4rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid black",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "100px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "#000",
        paddingTop: "0.4rem",
        fontSize: "0.75rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.1rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        float: "left",
        margin: "0 auto",
        position: "relative",
    }
};

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(c => {
        return <div 
            className={classes.miniColor} 
            style={{backgroundColor: c.color}} 
            key={c.name}>
        </div>;
    });
    
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName} 
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);