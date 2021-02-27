import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home as HomeIcon, LooksOne as LooksOneIcon, LooksTwo as LooksTwoIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

interface LeftDrawerInterface {
    open: boolean,
    onClose: any
}

export function LeftDrawer(props: LeftDrawerInterface) {
    const classes = useStyles()

    return (
        <Drawer anchor='left' open={props.open}>
            <List className={classes.root}>

                <Link to='/' onClick={props.onClose}>
                    <ListItem button key='Home'>
                        <ListItemIcon>
                            <HomeIcon />
                            <ListItemText primary='Home' />
                        </ListItemIcon>
                    </ListItem>
                </Link>

                <Link to='/PageOne' onClick={props.onClose}>
                    <ListItem button key='PageOne'>
                        <ListItemIcon>
                            <LooksOneIcon />
                            <ListItemText primary='PageOne' />
                        </ListItemIcon>
                    </ListItem>
                </Link>

                <Link to='/PageTwo' onClick={props.onClose}>
                    <ListItem button key='PageTwo'>
                        <ListItemIcon>
                            <LooksTwoIcon />
                            <ListItemText primary='PageTwo' />
                        </ListItemIcon>
                    </ListItem>
                </Link>

            </List>
        </Drawer>
    )
}