import sizes from './sizeHelpers';

const styles = {
    Palette: {
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    colors: { 
        height: "90%", 
        display: "flex", 
        flexWrap: "wrap",
        alignContent: "flex-start",
    },
    goBack: {
        width: "20%",
        height: "50%",
        position: "relative",
        cursor: "pointer",
        backgroundColor: "#000",
        "& a": {
            color: "#fff",
            width: "90px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-45px",
            marginTop: "-15px",
            outline: "none",
            border: "none",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            fontSize: "0.9rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            textDecoration: "none"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "33.333%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "20%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: "10%"
        }
    }
};

export default styles;