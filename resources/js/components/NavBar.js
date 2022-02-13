import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

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
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();

    return(
        <div className={classes.root}>
        <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}>
            <Toolbar>
                <form className={classes.title}>
                    <input type='hidden' value={props.csrf_token}/>
                    <Button type='submit' onClick={props.logout} >ログアウト</Button>
                </form>
                <Typography className={classes.menuButton} color="inherit" component={Link} to="/mypage/myposts">マイページ</Typography>
                <Typography className={classes.menuButton} color="primary" component={Link} to="/timeline">タイムライン</Typography>
                <Typography className={classes.menuButton} component={Link} to="/practice">面接練習</Typography>
                <Typography className={classes.menuButton}>{props.user.name}様 ID:{props.user.id}</Typography>
                <IconButton className={classes.menuButton} onClick={toggleOpen}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='right' open={open} onClose={toggleOpen}>
                    <Button component={Link} to="profile">プロフィール</Button>
                    <Typography component={Link} to="message">メッセージ</Typography>
                    <Typography component={Link} to="myposts">自分の投稿</Typography>
                    <Typography component={Link} to="likes">いいねした投稿</Typography>
                    <Typography component={Link} to="/practice">面接練習する</Typography>
                </Drawer>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default NavBar;
