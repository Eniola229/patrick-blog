import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidenav from './Sidenav';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Container } from '@mui/material';



export default function ButtonAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openmsg, setOpenmsg] = useState(false);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // Open the modal box after form submission
  };

  const handleClose = () => {
    setOpen(false);
    setOpenmsg(false);
  };

  const handleSubscribeClick = () => {
    setOpen(true); // Open the modal box when Subscribe button is clicked
  };
  const handleSub = () => {
    setOpenmsg(true);
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', color: 'red' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Sidenav />
          </IconButton>
          <Typography  sx={{ flexGrow: 1, fontWeight: "bold" }}>
            NomadicNarratives
          </Typography> 
            <Button
              sx={{
                background: "linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)",
                color: 'white',
                display: { xs: 'block', md: 'inline-block' } 
              }}
                onClick={handleSubscribeClick}
            >
              Subscribe
            </Button>
        </Toolbar>
      </AppBar>
    </Box>


   <Container maxWidth="sm">
      <Dialog
       open={open} onClose={handleClose}>
      <DialogContent>
          Subscribe to get all leatest updates from us 
        </DialogContent>
        <form 
         style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}

          onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          margin="normal"
          sx={{width:"80%"}}
        />
        <Button 
        type="submit" 
        onClick={handleSub} 
        variant="contained" 
        sx={{background:"green", color:"white"}}>
          Subscribe
        </Button>
      </form>
      </Dialog>
      <Dialog open={openmsg} onClose={handleClose}>
          <DialogTitle>Subscription Successful</DialogTitle>
          <DialogContent>
            Thank you for subscribing! You will receive updates at {email}.
          </DialogContent>
          <DialogActions>
            <Button 
            sx={{backgroundColor:"red", color:"white"}}
             onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
    </>
  );
}
 