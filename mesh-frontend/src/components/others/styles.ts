import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        paddingTop: 50,
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        overflowY: 'auto',
        overflowX: 'hidden'
    },
}))