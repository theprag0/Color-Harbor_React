import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import {withStyles} from '@material-ui/styles';
import DraggableColorBox from './DraggableColorBox';

const styles = {
    boxes: {
        height: "100%",
        display: "flex", 
        flexWrap: "wrap",
        alignContent: "flex-start"
    }
}

const DraggableColorList = SortableContainer((props) => {
    const {classes, colors, deleteColor} = props;
    return(
        <div className={classes.boxes}>
            {colors.map((c, idx) => {
                return (
                <DraggableColorBox
                    index={idx}
                    key={c.name}
                    color={c.color} 
                    name={c.name}
                    handleClick={() => deleteColor(c.name)}
                />
                )
            })}
        </div>
    );
});

export default withStyles(styles)(DraggableColorList);

