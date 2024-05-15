import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import EmployerCard from "../components/EmployerCard";

export default function EmployerAccount() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0'}}>
            <Menu />
            <div style={{marginLeft:'9em', marginTop:'3em'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                    <div style={{ borderRadius: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:'3em', paddingRight:'4em', padding: '1em', backgroundColor: 'white', marginTop: '6em', width: '81%', height: '4em', marginLeft: '2em'}}>
                        <div style={{ width: '50%'}}>
                            <Typography style={{ fontSize: '2em', fontWeight: 'bold' }}>Company Name</Typography>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <EmployerCard/>
                </div>
            </div>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}