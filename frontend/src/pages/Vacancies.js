import * as React from 'react';
import { Grid, Button, TextField, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import SearchIcon from '@mui/icons-material/Search';
import VacCard from "../components/VacCard";

export default function () {
    const cityName ='Lviv';
    const numOfJobs = 1;
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'rgba(208, 233, 208, 1)' }}>
            <Menu />
            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '6em' }}>
              <Grid item xs={12} md={4}>
                <TextField id="job-search" label="Enter Job Title" variant="outlined" className="custom-textfield" fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField id="city-search" label="Enter City" variant="outlined" className="custom-textfield" fullWidth />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" startIcon={<SearchIcon />} style={{ boxShadow: 'none', width: '100%', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold'}}> Search </Button>
              </Grid>
            </Grid>
            <div style={{display:'flex', flexDirection:'row'}}>
              <div style={{marginLeft:'10em'}}>
                  <div style={{marginTop:'0.5em'}}>
                      <Typography style={{fontSize:'1.5em', marginBottom:'0.5em'}}>{numOfJobs} job in <b>{cityName}</b></Typography>
                  </div>
                  <VacCard jobName={'IT teacher'} salary={2500} address={'vul. Shevchenka, 10, m. Kiev, Ukraine, 01001'} description={'We need a sociable, active person to conduct IT training according to a ready-made developed program. Nothing complicated, but very interesting. The main thing is to have a desire to work. WORK IN THE OFFICE, conducting ONLINE and LIVE classes.'}/>
              </div>

              <div style={{backgroundColor: 'white', width:'20%', borderRadius:'15px', padding: '1em', marginTop:'3em', marginRight:'10em', paddingLeft:'2em', position:'absolute', right: 0}}>
                  <Typography style={{fontSize:'1.5em', fontWeight:'bold'}}>Filters</Typography>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography style={{fontSize:'1em', fontWeight:'bolder', marginTop:'1em'}}>Working Type</Typography>
                      <FormControlLabel control={<Checkbox />} label="Full-Time" />
                      <FormControlLabel control={<Checkbox />} label="Part-Time" />
                      <FormControlLabel control={<Checkbox />} label="Remote" />
                  </div>
                  <Typography style={{fontSize:'1em', fontWeight:'bolder', marginTop:'1em'}}>Salary</Typography>
                  <TextField style={{marginRight:'2em'}} id="standard-basic" label="Min" variant="standard" />
                  <TextField id="standard-basic" label="Max" variant="standard" />
                  <Typography style={{fontSize:'1em', fontWeight:'bolder', marginTop:'1em'}}>Location</Typography>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="City"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Lviv</MenuItem>
                      <MenuItem value={20}>Kyiv</MenuItem>
                      <MenuItem value={30}>Odessa</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography style={{fontSize:'1em', fontWeight:'bolder', marginTop:'1em'}}>Category</Typography>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>IT</MenuItem>
                      <MenuItem value={20}>Design</MenuItem>
                      <MenuItem value={30}>Busines</MenuItem>
                      <MenuItem value={40}>Education</MenuItem>
                      <MenuItem value={50}>Real estate</MenuItem>
                      <MenuItem value={60}>Marketing</MenuItem>
                    </Select>
                  </FormControl>
              </div>
            </div>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}