import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';


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
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' , width: '100%' }}>
            <div style={{ margin: 'auto' }}>
              <Button color="inherit" style={{ fontWeight: 'bold', fontSize: '1.5em', marginRight: '2em' }}>Categories</Button>
              <Button color="inherit" style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Saved</Button>
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>{setting}</MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

export default MenuComponent;


