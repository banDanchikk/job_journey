import { Typography, Button, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import Bottom from '../components/Bottom';
import Menu from '../components/Menu';


export default function LoginPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Menu />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '87.5vh' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#44CA92', textAlign: 'center', padding: '2em', width:'45%', alignItems:'center', justifyContent: 'center', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
                        <Typography style={{ fontWeight: 'bold', color: 'white', fontSize: '3em' }}>Welcome Back!</Typography>
                        <TextField id="email" label="Email" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '100%' }} />
                        <TextField id="password" label="Password" variant="outlined" className="reg-textfield" style={{ marginTop: '1em', width: '100%' }} />
                        <Button variant='outlined' style={{ color: 'white', fontSize: '1.5em', borderRadius: '100px', borderColor: 'white', marginTop: '1em'}}>Sign in</Button>
                    </div>
                    <div style={{ backgroundColor: '#D0E9D0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em', width:'55%', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                        <Typography style={{ fontWeight: 'bold', color: '#44CA92', fontSize: '3em' }}>New here? Join our community!</Typography>
                        <Typography style={{ color: 'white', color: '#44CA92', fontSize: '1.5em' }}>If you dont hawe account just create it!</Typography>
                        <Link to="/registration">
                            <Button variant='outlined' style={{ color: '#44CA92', fontSize: '1.5em', borderRadius: '100px', borderColor: '#44CA92', marginTop: '1em'}}>Sign Up</Button>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div style={{marginTop: 'auto' }}>
                <Bottom />
            </div>
        </div>
    );
}

