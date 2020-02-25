import React from 'react';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
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
import Button from '@material-ui/core/Button';

/*const useStyles = () => createStyles({
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
  headerText: {
    color: 'white',
    textDecoration: 'none'
  },
  headerLinks: {
    marginLeft: 'auto',
    display: "flex",
    flexDirection: "row",
    direction: "ltr"
  },
}) as any;*/

const styles = {
  whiteText:{
    color: "white"
  }
}

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiListItemText: {
      primary: {
        color: "black",
        paddingRight: "100px"
      }
    }
  }
});

export default function TemporaryDrawer(props: any) {
  console.log(props.loggedIn);
  const menuItems = props.loggedIn ? ['Home', 'Cholesterol', 'Resting Heart Rate'] : ['Home', 'Log In'];
  console.log(menuItems);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const sideList = (side: any) => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List style={{ paddingTop: '0px' }}>
        {menuItems.map((text, index) => (
          <Link to={text.split(' ').join('')} key={text}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const toggleDrawer = (side: any, open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  console.log(props.loggedIn);
  if (!props.loggedIn) {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
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
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" style={{
                textDecoration: "none"
              }} >
                <Typography variant="h5" style={styles.whiteText} noWrap>
                  Healthy Life Style
            </Typography>
              </Link>
              <div style={{marginLeft: "auto", display: "flex", flexDirection: "row"}}>
                <Link to="/Login" style={{
                  textDecoration: "none", flexDirection: "row",
                  display: "flex"
                }} >
                  <Typography variant="h5" style={styles.whiteText} noWrap>
                    Login
            </Typography>
                </Link>
                <Link to="/Signup" style={{ marginLeft: "30px", textDecoration: "none", display: "flex", flexDirection: "row" }}>
                  <Typography variant="h5" style={styles.whiteText} noWrap>
                    Signup
                </Typography>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div>
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
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h5" style={styles.whiteText} noWrap>
                Healthy Life Style
          </Typography>
            </Link>
            <div style={{marginLeft: "auto" }}>
              <Button onClick={props.logout} style={{ color: "white"}}>
                Logout
            </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
      </div>
    </MuiThemeProvider>
  );
}
