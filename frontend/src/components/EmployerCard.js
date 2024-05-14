import React from 'react';
import { Typography, Button, Avatar} from "@mui/material";

function EmployerCard({ name,  cityName, address, number, email, social, image }) {
    return (
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', width:'80%', borderRadius:'15px', padding:'1em', paddingLeft:'3em', paddingRight:'3em', margin: '2em'}}>
            <div>
                <Typography style={{fontSize:'2em', marginBottom: '0.5em', fontWeight:'bold'}}>{name}</Typography>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em'}}>Your City: {cityName}</Typography>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em'}}>Address: {address}</Typography>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em'}}>Phone Number: {number}</Typography>
                <Typography style={{fontSize:'1.5em', marginBottom: '0.5em'}}>Email: {email}</Typography>
                <Typography style={{fontSize:'1.5em'}}>Social Networks: {social}</Typography>
                <Button variant="contained" style={{ backgroundColor:'rgba(68, 202, 146, 0.42)', borderRadius:'100px', boxShadow: 'none', width: '12em', height:'5em', marginTop:'2em', color:'black' }}>Edit Profile</Button>
            </div>
            <div style={{marginLeft: 'auto', textAlign: 'center'}}>
                <Avatar alt="User" style={{width:'9em', height:'9em', marginTop: '1em'}}/>
                <Button variant="contained" style={{backgroundColor:'#44CA92', borderRadius:'100px', boxShadow: 'none', marginTop:'5em', width: '12em', height:'5em'}}>Post a Vacancy</Button>
            </div>
            
        </div>
    );
}

export default EmployerCard;