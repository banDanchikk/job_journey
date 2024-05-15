import React from 'react';
import { Typography, Paper, Button } from "@mui/material";
import { Archive} from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function VacSearchCard({ jobName, description, salary, address }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#D0E9D0', marginTop: '3em', paddingBottom: '1em' }}>
            <Paper style={{ margin: '2em', padding: '2em', position: 'relative', marginTop: '3em', borderRadius:'20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'2em' }}>
                    <div style={{display:'flex', flexDirection:'row', alignItems: 'center', width:'20%'}}>
                        <Button variant="contained" style={{ marginRight:'2em', boxShadow: 'none', width: '100%', height: '4em', borderRadius: '100px', backgroundColor: '#44CA92', fontWeight: 'bold'}}> Send CV</Button>
                        <Button variant="outlined" startIcon={<FavoriteBorderIcon />} style={{ boxShadow: 'none', width: '100%', height: '4em', borderRadius: '100px', color:'#44CA92', borderColor:'#44CA92', fontWeight: 'bold'}}> Save </Button>
                    </div>
                </div>
                <div style={{ marginLeft: '2em' }}>
                    <Typography style={{fontWeight:"bold"}} variant="h4" gutterBottom>{jobName}</Typography>
                    <Typography variant="body1" gutterBottom>{description}</Typography>
                    <Typography variant="h4" gutterBottom>{salary}</Typography>
                    <Typography variant="body1" gutterBottom>{address}</Typography>
                </div>
            </Paper>
        </div>
    );
}
