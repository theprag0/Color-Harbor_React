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
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
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
            textDecoration: "none",
        }
    }
};

export default styles;