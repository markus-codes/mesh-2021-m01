import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import { LeftDrawer } from "../others/LeftDrawer";
import { useState } from "react";
import { useStyles } from "./styles";


export function NavBar() {
    const classes = useStyles()

    const [drawer, setDrawer] = useState(false)

    return (
        <>
            <LeftDrawer open={drawer} onClose={() => setDrawer(false)} />
            <AppBar color='primary' className={classes.root}>
                <Toolbar>
                    <IconButton color='inherit' aria-label='Open Menu' onClick={() => setDrawer(true)} >
                        {drawer ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography className={classes.title} variant={'h1'}>Mesh Frondend</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}