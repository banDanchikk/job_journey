import React, { useState } from 'react';
import { Typography, TextField, Button, IconButton, colors } from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditUserInfo() {
    const [links, setLinks] = useState(['']);

    const handleAddLink = () => {
        setLinks([...links, '']); 
    };

    const handleDeleteLink = (index) => {
        const updatedLinks = [...links]; 
        updatedLinks.splice(index, 1); 
        setLinks(updatedLinks); 
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...links]; 
        updatedLinks[index] = value; 
        setLinks(updatedLinks); 
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'rgba(208, 233, 208, 1)' }}>
            <Menu />
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop: '2.5em' }}>New info</Typography>
            <div style={{ display:'flex', flexDirection:'column',backgroundColor: 'white', width: '70%', padding: '2em', borderRadius: '15px', marginTop: '2em', marginBottom:'2em', alignSelf: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <TextField id="last name" label="Last Name" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '43.5%', marginRight: '2em' }} />
                    <TextField id="first name" label="First Name" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '44%' }} />
                </div>
                <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    style={{ marginTop: '1em', width: '90%', color: 'transparent' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={null}
                />
                <TextField id="city" label="City of Residence" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%' }} />
                <TextField id="number" label="Phone Number" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%' }} />
                <TextField id="email_addr" label="Email Address" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '90%' }} />
                {links.map((link, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TextField
                            id={`link-${index}`}
                            label="Link"
                            variant="outlined"
                            className="reg-textfield"
                            style={{ marginTop: '1em', width: 'calc(100% - 48px)', width: '90%' }}
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                        />
                        <IconButton style={{ color: 'black', marginTop: '0.5em' }} onClick={() => handleDeleteLink(index)}>
                            <DeleteIcon style={{ fontSize: '1.5em' }} />
                        </IconButton>
                    </div>
                ))}
                <Button onClick={handleAddLink} style={{ marginTop: '1em', color: 'rgba(68, 202, 146, 1)', fontWeight: 'bold', fontSize: '1em', width:'10%'}}>Add Link</Button>
                <div style={{display: 'flex', justifyContent: 'space-between', width:'20%'}}>
                    <Button variant="contained" style={{ boxShadow: 'none', width: '9em', height: '3em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold', marginTop: '1em', marginRight:'2em' }}>Save</Button>
                    <Button variant="outlined" style={{ boxShadow: 'none', width: '9em', height: '3em', borderRadius: '100px', backgroundColor: 'transpearent', fontWeight: 'bold', marginTop: '1em', color:'#44CA92', borderColor:'#44CA92' }}>Cancel</Button>
                </div>
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Bottom/>
            </div>
        </div>
    );
}
