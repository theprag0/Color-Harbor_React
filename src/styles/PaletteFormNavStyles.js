import {DRAWER_WIDTH} from '../constants';
import sizes from './sizeHelpers';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    navBtns: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        },
        [sizes.down("xs")]: {
            marginRight: "0.5rem"
        }
    },
    btn: {
        margin: "0 0.5rem",
        textTransform: "uppercase",
        [sizes.down("md")]: {
            fontSize: "0.6rem"
        },
        [sizes.down("xs")]: {
            margin: "0"
        }
    }
});

export default styles;