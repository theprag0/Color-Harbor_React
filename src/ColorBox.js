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
                chroma(props.background).luminance() >= 0.7 ? '#000' : '#fff'
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
    }
}

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
        const isDarkColor = chroma(background).luminance() <= 0.09;
        const isLightColor = chroma(background).luminance() >= 0.7;
        
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.ColorBox}>
                    <div style={{background}} className={`copy-overlay ${copied && "show"}`}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
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