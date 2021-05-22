import sizes from './sizeHelpers';

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
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
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
        alignItems: "center",
        [sizes.down("sm")]: {
            fontSize: "10px",
            padding: "12px",
            bottom: "-8px"
        }
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};

export default styles;