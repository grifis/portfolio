import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideocamIcon from '@material-ui/icons/Videocam';
import Tooltip from '@material-ui/core/Tooltip';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function NavBar(props) {

    const [open, setOpen] = useState(false);
    const toggleOpen=() => {
        setOpen(!open);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: "black"
        },
        title: {
            flexGrow: 1,
        },
        toolbar: theme.mixins.toolbar,
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
    }));

    const classes = useStyles();

    return(
        <div className={classes.root}>
        <AppBar position="fixed"  className={classes.appBar}>
            <Toolbar>
                <form className={classes.title}>
                    <input type='hidden' value={props.csrf_token}/>
                    <Tooltip title="ログアウト">
                        <IconButton type='submit' onClick={props.logout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </form>
                <Tooltip title="タイムライン">
                    <IconButton className={classes.menuButton} component={Link} to="/timeline">
                        <TimelineIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="面接練習">
                    <IconButton className={classes.menuButton} component={Link} to="/practice">
                        <VideocamIcon />
                    </IconButton>
                </Tooltip>
                <Typography className={classes.menuButton}>{props.user.name}様 </Typography>
                <IconButton className={classes.menuButton} onClick={toggleOpen}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='right' open={open} onClose={toggleOpen}>
                    <Button component={Link} to="profile">プロフィール</Button>
                    {/*<Button component={Link} to="message">メッセージ</Button>*/}
                    <Button component={Link} to="myposts">自分の投稿</Button>
                    <Button component={Link} to="likes">いいねした投稿</Button>
                    <Button component={Link} to="/practice">面接練習する</Button>
                </Drawer>
            </Toolbar>
        </AppBar>
        <div className={classes.toolbar} />
        </div>
    )
}

export default NavBar;
