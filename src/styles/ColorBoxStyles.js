import chroma from 'chroma-js';
import sizes from './sizeHelpers';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        position: "relative",
        cursor: "pointer",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => props.showingFullPalette ? "20%" : "33.333%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => props.showingFullPalette ? "10%" : "20%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => props.showingFullPalette ? "5%" : "10%"
        }
    },
    copyText: {
        color: props => 
                chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
    },
    colorName: {
        color: props => 
                chroma(props.background).luminance() <= 0.09 ? '#fff' : '#000' 
    },
    seeMore: {
        color: props => 
                chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : '#fff',
        position: "absolute",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "none",
        width: "50px",
        height: "25px",
        fontSize: "13px",
        fontWeight: "400",
        textAlign: "center",
        lineHeight: "25px",
        textTransform: "uppercase",
    },
    copyButton: {
        color: props => 
                chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : '#fff',
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
        textDecoration: "none",
        opacity: "0"
    },
    boxContent: {
        position: "absolute",
        left: "0",
        bottom: "0",
        width: "100%",
        padding: "10px",
        color: "#000",
        letterSpacing: "1px",
        fontSize: "11px",
        textTransform: "uppercase",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "2.5rem",
        transform: "scale(0.1)",
        opacity: 0,
        "& h1": {
            fontWeight: 400,
            textShadow: "1px 2px #000",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
            color: "#fff",
            [sizes.down("xs")]: {
                fontSize: "5rem"
            }
        },
        "& p": {
            fontSize: "1.7rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: 1,
        transform: "scale(1)",
        zIndex: 25,
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    }
};

export default styles;