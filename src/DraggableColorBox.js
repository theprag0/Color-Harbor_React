import React from 'react';
import {withStyles} from '@material-ui/styles';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        position: "relative",
        cursor: "pointer",
        // display: "inline-block",
        // marginBottom: "-6px",
        "&:hover svg": {
            color: "#fff",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        left: "0",
        bottom: "0",
        width: "100%",
        padding: "10px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        fontSize: "11px",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};

const DraggableColorBox = SortableElement((props) => {
    const {classes, color, name, handleClick} = props;
    return(
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    fontSize="small"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
});

export default withStyles(styles)(DraggableColorBox);