import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo2.png';

const settings = ['Account', 'Logout'];

function MenuComponent() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
      <AppBar position="fixed" style={{boxShadow: 'none'}}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' , width: '100%' }}>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <img src={logoImage} style={{width: '5em', marginBottom: '0.25em'}}/>
            </Link>
            <div style={{ margin: 'auto' }}>
              <Link to={`/categories`} style={{ textDecoration: 'none' }}>
                <Button color="inherit" style={{ fontWeight: 'bold', fontSize: '1.5em', marginRight: '2em', color:'white' }}>Categories</Button>
              </Link>
              <Link to={`/saved`} style={{ textDecoration: 'none' }}>
                <Button color="inherit" style={{ fontWeight: 'bold', fontSize: '1.5em', color:'white' }}>Saved</Button>
              </Link>
            </div>
          </Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem component={Link} to="/account" onClick={handleCloseUserMenu}>Account</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

export default MenuComponent;
