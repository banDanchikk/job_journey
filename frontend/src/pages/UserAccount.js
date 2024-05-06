import { Typography, LinearProgress , Button } from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import SearcherCard from "../components/SearcherCard";
import MyCV from "../components/MyCV";
import { Link } from 'react-router-dom';

export default function UserAccount() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#D0E9D0'}}>
            <Menu />
            <div style={{marginLeft:'9em', marginTop:'3em'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                    <div style={{ borderRadius: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1em', backgroundColor: 'white', marginTop: '6em', width: '50%', height: '4em', marginLeft: '2em'}}>
                        <div style={{ width: '100%' }}>
                            <Typography style={{ fontSize: '2em', fontWeight: 'bold' }}>Account Filling</Typography>
                            <LinearProgress variant="determinate" value={50} style={{ height: '1em', width: '75%', borderRadius: '10px' }} />
                        </div>
                        <Typography style={{ alignSelf: 'center', marginRight: '1em', fontSize: '2em', fontWeight: 'bold' }}>50%</Typography>
                    </div>
                    <Link to={`/edituser`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{backgroundColor:'rgba(68, 202, 146, 0.42)', borderRadius:'100px', boxShadow: 'none', width: '12em', height:'5em', marginTop:'8em', color:'black', marginLeft: '5em', alignSelf:'center', marginRight:'13em'}}>Edit Profile</Button>
                    </Link>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <SearcherCard name ='My Name'/>
                    <div style={{backgroundColor:'white', width:'30%', borderRadius: '15px', padding:'1em', margin:'2em'}}>
                        <Typography style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '0.5em'}}>My CVs:</Typography>
                        <MyCV cvName='Web-dev.pdf'/>
                        <MyCV cvName='Web-dev.pdf'/>
                        <MyCV cvName='Web-dev.pdf'/>
                    </div>
                </div>
                
            </div>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}