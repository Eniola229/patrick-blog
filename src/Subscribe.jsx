import React, { useState } from 'react';
import { TextField, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // Open the modal box after form submission
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribeClick = () => {
    setOpen(true); // Open the modal box when Subscribe button is clicked
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Subscribe
        </Button>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscription Successful</DialogTitle>
        <DialogContent>
          Thank you for subscribing! You will receive updates at {email}.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Subscribe;
