import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import {withStyles} from '@material-ui/styles';
import './ColorBox.css';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        position: "relative",
        cursor: "pointer",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
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
        textTransform: "uppercase"
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
            color: "#fff"
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

class ColorBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied:false}), 1500);
        });
    }

    render() {
        const {name, background, paletteId, colorId, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.ColorBox}>
                    <div 
                        style={{background}} 
                        className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                    />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>
                            Copy
                        </button>
                    </div>
                    { showingFullPalette &&
                    <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                        <span className={classes.seeMore}>
                            MORE
                        </span>
                    </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);