import React, { useState } from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';

export default function CreateVacancie() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'rgba(208, 233, 208, 1)' }}>
            <Menu />
            <div style={{display:'flex', flexDirection:'column', alignContent: 'center'}}>
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '7em', marginTop: '2.5em' }}>Create Vacancie</Typography>
            <div style={{ display:'flex', flexDirection:'column',backgroundColor: 'white', width: '70%', padding: '2em', borderRadius: '15px', marginTop: '2em', marginBottom:'2em', alignSelf: 'center' }}>
                <TextField id="last name" label="Vacancie Name" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%', marginRight: '2em' }} />
                <FormControl variant="standard" style={{width: '90%', marginTop:'1em'}}>
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
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Typography style={{fontSize:'1em', marginTop:'1em'}}>Salary</Typography>
                <div>
                    <TextField style={{marginRight:'2em'}} id="standard-basic" label="Min" variant="standard" />
                    <TextField id="standard-basic" label="Max" variant="standard" />
                </div>
                <TextField id="first name" label="City" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%' }} />
                <TextField id="city" label="Address" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography style={{fontSize:'1em', marginTop:'1em'}}>Working Type</Typography>
                      <FormControlLabel control={<Checkbox />} label="Full-Time" />
                      <FormControlLabel control={<Checkbox />} label="Part-Time" />
                      <FormControlLabel control={<Checkbox />} label="Remote" />
                  </div>
                  <TextField id="outlined-multiline-flexible" label="Vacancie Description" multiline maxRows={6} style={{width:'90%'}} />
                <div style={{display: 'flex', justifyContent: 'space-between', width:'20%'}}>
                    <Button variant="contained" style={{ boxShadow: 'none', width: '9em', height: '3em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold', marginTop: '1em' }}>Save</Button>
                    <Button variant="outlined" style={{ boxShadow: 'none', width: '9em', height: '3em', borderRadius: '100px', backgroundColor: 'transpearent', fontWeight: 'bold', marginTop: '1em', color:'#44CA92', borderColor:'#44CA92' }}>Cancel</Button>
                </div>
            </div>
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Bottom/>
            </div>
        </div>
    );
}
