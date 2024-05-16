import { Typography} from "@mui/material";
import Menu from '../components/Menu';
import Bottom from '../components/Bottom';
import EmployerCard from "../components/EmployerCard";

export default function EmployerAccount() {
    const companyName = 'CP Development'
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#CBE3F0'}}>
            <Menu />
            <div style={{marginLeft:'9em', marginTop:'3em'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                    <div style={{ borderRadius: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:'3em', paddingRight:'4em', padding: '1em', backgroundColor: 'white', marginTop: '6em', width: '83.5%', height: '4em', marginLeft: '2em'}}>
                        <div style={{ width: '50%'}}>
                            <Typography style={{ fontSize: '2em', fontWeight: 'bold' }}>{companyName}</Typography>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <EmployerCard name={'John Doe'} cityName={'Lviv'} address={'Horodotska street'} number={'+380662410786'} email={'useremail@gmail.com'} social={'instagram.com'}/>
                </div>
            </div>
            <div style={{ marginTop: 'auto'}}>
                <Bottom />
            </div>
        </div>
    );
}