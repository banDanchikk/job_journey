import React from 'react';
import './App.css';
import Menu from './Menu';
import { Typography, TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  return (
    <div className="App">
      <Menu />
      <Typography variant="h6" component="div" style={{ fontSize: '5em', marginTop: '1em' }}>Find and hire experts for any job</Typography>

      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2em' }}>
        <Grid item>
          <TextField id="job-search" label="Enter Job Title" variant="outlined" className="custom-textfield" />
        </Grid>
        <Grid item>
          <TextField id="city-search" label="Enter City" variant="outlined" className="custom-textfield" />
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<SearchIcon fontSize="large"/>} style={{ width: '10em', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold'}}> Search </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
