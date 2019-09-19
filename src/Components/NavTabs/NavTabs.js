import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
      width: 250,
      padding: 0
    },
    fullList: {
      width: 'auto',
    },
    listItem: {
        borderTop: '7px solid black'
    }
  });

export default function TemporaryDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const menuItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List style={{paddingTop: '0px'}}>
        {menuItems.map((text, index) => (  
          <ListItem button key={text} style={index === menuItems.length-1 ? {borderTop:'1px solid lightGrey', borderBottom: '1px solid lightGrey'} : {borderTop:'1px solid lightGrey'}}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={clsx(classes.menuButton, state.left && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}
