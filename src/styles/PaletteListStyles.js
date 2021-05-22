import sizes from './sizeHelpers';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("lg")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "70%"
        }
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: "#fff",
        "& a": {
            color: "#fff"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem"
        }
    }
}

export default styles;