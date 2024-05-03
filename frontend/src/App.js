import React from 'react';
import './App.css';
import Menu from './Menu';
import Bottom from './Bottom';
import { Typography, TextField, Button, Grid, Card, CardContent, CardMedia,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Divider from '@mui/material/Divider';


function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '60%' }}>
        <Menu />
        <Typography variant="h1" component="div" style={{ fontSize: '5.5em', marginTop: '1em' }}>Find and hire<br/> experts for any job</Typography>

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2em' }}>
          <Grid item xs={12} md={5}>
            <TextField id="job-search" label="Enter Job Title" variant="outlined" className="custom-textfield" fullWidth />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField id="city-search" label="Enter City" variant="outlined" className="custom-textfield" fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" startIcon={<SearchIcon />} style={{ width: '100%', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold'}}> Search </Button>
          </Grid>
        </Grid>

        <Card variant="outlined" style={{ marginTop: '12em', marginBottom: '5em', backgroundColor: 'rgba(21, 255, 0, 0.11)' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FilePresentIcon style={{ fontSize: '10em', color: 'black', fontWeight: 'lighter' }} />
            <CardContent style={{ textAlign: 'left' }}>
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: '2.5em' }}>
                Get your dream job in a few minutes
              </Typography>
              <Typography variant="body1" component="div" style={{ marginTop: '1em', fontSize: '1.5em' }}>
                Find your dream job and earn from world leading brands. Upload your CV now.
              </Typography>
              <Button variant="contained" color="primary" style={{ width: '12em', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold', marginTop: '1em' }}>
                Upload your CV
              </Button>
            </CardContent>
          </div>
        </Card>

      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
        <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em' }}>Comments about us</Typography>
        <div style={{ marginLeft: 'auto', marginRight: '5em' }}>
          <IconButton><WestIcon style={{ fontSize: '1.5em', color: 'black' }}/></IconButton>
          <IconButton><EastIcon style={{ fontSize: '1.5em', color: 'black' }}/></IconButton>
        </div>
      </div>
      <Card variant="outlined" style={{ marginBottom: '5em', backgroundColor: '#44CA92', color: 'white', width: '30%' }}>
        <CardContent>
          <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>Username</Typography>
          <Divider style={{ width: '100%', backgroundColor: 'white' }} />
          <Typography variant="body1" component="div" style={{ marginTop: '1em', fontSize: '1.5em' }}>
            lorem ipsum aeirhgaieugh ...</Typography>
        </CardContent>
      </Card>
      <Bottom/>
    </div>
  );
}

export default App;
