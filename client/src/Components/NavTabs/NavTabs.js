import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
    padding: 0
  },
  fullList: {
    width: 'auto',
  },
  listItem: {
    borderTop: '1px solid lightGrey',
  },
  listItemBottom: {
    borderTop: '1px solid lightGrey',
    borderBottom: '1px solid lightGrey',
  },
  linkText: {
    color: 'black',
    textDecoration: 'none'
  },
  headerText:{
    color: 'white',
    textDecoration: 'none'
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const menuItems = ['Home', 'Cholesterol', 'Resting Heart Rate', 'Other'];
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
      <List style={{ paddingTop: '0px' }}>
        {menuItems.map((text, index) => (
          <Link to={text.split(' ').join('')} className={classes.linkText} key={text}>
            <ListItem button className={index === menuItems.length - 1 ? classes.listItemBottom : classes.listItem}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
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
        position="sticky"
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
          <Link to="/Home" className={classes.headerText}>
            <Typography variant="h5" noWrap>
              Healthy Life Style
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}
