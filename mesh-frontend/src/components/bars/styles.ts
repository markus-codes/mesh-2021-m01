import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        top: 0,
        position: 'fixed'
    },
    title: {
        marginLeft: 10,
        fontSize: 25,
        fontWeight: 600,
        color: theme.palette.primary.contrastText
    }
}))