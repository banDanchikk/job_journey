import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import SavedJob from "../components/SavedJob";

export default function () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0' }}>
            <Menu />
            <Typography variant="h3" component="div" style={{ fontSize: '2.5em', fontWeight: 'bolder', marginLeft: '1em', marginTop: '2.5em' }}>Saved Jobs</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'2em' }}>
                <SavedJob jobName={"IT teacher"} description={"We need a sociable, active person to conduct IT training according to a ready-made developed program. Nothing complicated, but very interesting. The main thing is to have a desire to work. WORK IN THE OFFICE, conducting ONLINE and LIVE classes."}/>
            </div>
            
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}