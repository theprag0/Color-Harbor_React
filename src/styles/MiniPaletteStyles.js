const styles = {
    root: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: "0.4rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid black",
        cursor: "pointer",
        "&:hover svg": {
            opacity: 1
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
    },
    deleteIcon: {
        color: "#fff",
        backgroundColor: "#eb3d30",
        width: "19px",
        height: "19px",
        position: "absolute",
        right: "0",
        top: "0",
        padding: "10px",
        zIndex: 10,
        opacity: 0,
        transition: "all 0.3s ease-in-out"
    }
};

export default styles;