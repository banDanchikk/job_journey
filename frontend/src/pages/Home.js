import React from 'react';
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import { Typography, TextField, Button, Grid, Card, CardContent, CardMedia,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import student from '../images/student.png'
import Comment from '../components/Comment';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

export default function () {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ maxWidth: '60%' }}>
            <Menu />
            <Typography variant="h1" component="div" style={{ fontSize: '5.5em', marginTop: '2em' }}>Find and hire<br/> experts for any job</Typography>
    
            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2em' }}>
              <Grid item xs={12} md={5}>
                <TextField id="job-search" label="Enter Job Title" variant="outlined" className="custom-textfield" fullWidth />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField id="city-search" label="Enter City" variant="outlined" className="custom-textfield" fullWidth />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" startIcon={<SearchIcon />} style={{ boxShadow: 'none', width: '100%', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold'}}> Search </Button>
              </Grid>
            </Grid>
            
            <div style={{ marginTop: '8em', backgroundColor: '#CBE3F0', width: '100%', paddingTop: '1em', paddingBottom: '2em', borderRadius: '20px'}}>

              <Typography style={{ fontWeight: 'bold', fontSize: '2.5em'}}>How it's work?</Typography>
              
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2em', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2em', marginLeft: '2em', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ backgroundColor: 'green', width: '4em', height: '4em', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6994D4', borderRadius: '100px' }}>
                    <LooksOneIcon style={{fontSize: '3em', color: 'white' }}/>
                  </div>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Create Account</Typography>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>It's very easy to open an account<br/>and start your journey.</Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2em', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'green', width: '4em', height: '4em', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6994D4', borderRadius: '100px' }}>
                        <LooksTwoIcon style={{ fontSize: '3em', color: 'white' }} />
                    </div>
                    <Typography style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Complete your profile</Typography>
                    <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Complete your profile with all the info<br/>to get attention of client.</Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2em', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ backgroundColor: 'green', width: '4em', height: '4em', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6994D4', borderRadius: '100px' }}>
                    <Looks3Icon style={{fontSize: '3em', color: 'white' }}/>
                  </div>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Apply job or hire</Typography>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Apply & get your preferable jobs with all<br/>the requirements and get it.</Typography>
                </div>

              </div>
            </div>
              <Card variant="outlined" style={{ marginTop: '12em', marginBottom: '5em', backgroundColor: 'rgba(21, 255, 0, 0.11)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={student} style={{width: '12em', marginBottom: '0', marginRight: '2em', marginLeft: '2em', marginTop: '2em'}}/>
                  <CardContent style={{ textAlign: 'left' }}>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: '2.5em' }}>
                      Get your dream job in a few minutes
                    </Typography>
                    <Typography variant="body1" component="div" style={{ marginTop: '1em', fontSize: '1.5em' }}>
                      Find your dream job and earn from world leading brands.<br/>Upload your CV now.
                    </Typography>
                    <Button variant="contained" color="primary" style={{ boxShadow: 'none', width: '12em', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold', marginTop: '1em' }}>
                      Upload CV
                    </Button>
                  </CardContent>
                </div>
              </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop:'2em', marginBottom: '1em' }}>Comments about us</Typography>
              <div style={{ marginLeft: 'auto', marginRight: '5em' }}>
                  <IconButton><WestIcon style={{ fontSize: '1.5em', color: 'black' }}/></IconButton>
                  <IconButton><EastIcon style={{ fontSize: '1.5em', color: 'black' }}/></IconButton>
              </div>
          </div>

          <Comment/>
          <Bottom/>
        </div>
      );
}